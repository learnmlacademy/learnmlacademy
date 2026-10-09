from io import BytesIO
import subprocess
from unittest.mock import patch
import pytest
from pypdf import PdfWriter
from scripts.create_test_pdfs import FIXTURES, make_pdf
from src.pdf_loader import load_pdf, load_documents, PDFError, safe_filename


def test_synthetic_extraction_and_source_identity():
    data = make_pdf(FIXTURES["policy.pdf"])
    first = load_pdf(data, "../../policy.pdf")
    second = load_pdf(data, "policy.pdf")
    assert first == second
    assert first.document == "policy.pdf" and len(first.document_id) == 64
    assert [p.page for p in first.pages] == [1, 2, 3]
    assert "30 days" in first.pages[0].text and "60 days" in first.pages[1].text
    assert all(p.document_id == first.document_id for p in first.pages)


@pytest.mark.parametrize("payload", [b"", b"not PDF", b"%PDF-1.4\nmalformed", b"%PDF-" + b"x" * (10 * 1024 * 1024)],
                         ids=["empty", "signature", "malformed", "oversized"])
def test_bad_pdf_rejected(payload):
    with pytest.raises(PDFError):
        load_pdf(payload, "file.pdf")


def test_blank_encrypted_and_mixed_pages():
    writer = PdfWriter()
    writer.add_blank_page(width=595, height=842)
    buffer = BytesIO()
    writer.write(buffer)
    with pytest.raises(PDFError, match="OCR"):
        load_pdf(buffer.getvalue(), "scan.pdf")
    writer.encrypt("secret")
    encrypted = BytesIO()
    writer.write(encrypted)
    with pytest.raises(PDFError, match="Encrypted"):
        load_pdf(encrypted.getvalue(), "locked.pdf")
    mixed = PdfWriter()
    mixed.add_blank_page(width=595, height=842)
    mixed.append(BytesIO(make_pdf([("Text", "Visible text on the second page.")])))
    output = BytesIO()
    mixed.write(output)
    doc = load_pdf(output.getvalue(), "mixed.pdf")
    assert doc.skipped_pages == (1,) and doc.pages[0].page == 2


def test_page_limit_and_empty_document():
    for count in [0, 101]:
        writer = PdfWriter()
        for _ in range(count):
            writer.add_blank_page(width=100, height=100)
        buffer = BytesIO()
        writer.write(buffer)
        with pytest.raises(PDFError, match="1 to 100"):
            load_pdf(buffer.getvalue(), "pages.pdf")


def test_timeout_is_clear_and_safe():
    with patch("src.pdf_loader.subprocess.run", side_effect=subprocess.TimeoutExpired("parser", 20)):
        with pytest.raises(PDFError, match="20-second"):
            load_pdf(b"%PDF-1.4", "file.pdf")


def test_filename_and_collection_limits():
    assert safe_filename(r"C:\private\name.pdf") == "name.pdf"
    with pytest.raises(PDFError): safe_filename("fake.txt")
    for files in [[], [("a.pdf", b"x")] * 11, [("a.pdf", b"x" * (10 * 1024 * 1024))] * 5]:
        with pytest.raises(PDFError): load_documents(files)
    data = make_pdf(FIXTURES["policy.pdf"])
    with pytest.raises(PDFError, match="Duplicate PDF"):
        load_documents([("a.pdf", data), ("b.pdf", data)])
    with pytest.raises(PDFError, match="filenames"):
        load_documents([("a.pdf", data), ("A.pdf", make_pdf(FIXTURES["employee_guide.pdf"]))])
