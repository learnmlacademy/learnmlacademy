"""Original synthetic fixtures, generated locally; no third-party documents."""
from io import BytesIO
from pathlib import Path
import argparse
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen.canvas import Canvas

FIXTURES = {
    "policy.pdf": [
        ("Refund eligibility", "The refund window is 30 days after delivery. A receipt is required. Returned items must be unused and in their original packaging. Refunds go to the original payment method within 7 business days after inspection."),
        ("Damaged goods exception", "Damaged goods may be reported within 60 days after delivery, even if opened. Send photographs of the damage and the order number to support. The customer may choose a replacement or a full refund. This exception does not cover normal wear."),
        ("International orders", "International orders follow the same 30-day refund window. The customer pays return shipping unless the goods arrived damaged. Customs duties are not refunded by the store. Contact support before returning an international shipment."),
    ],
    "employee_guide.pdf": [
        ("Annual leave", "Full-time employees receive 24 days of paid annual leave each calendar year. Request leave at least 10 working days in advance. Unused leave may be carried forward up to a maximum of 5 days with manager approval."),
        ("Remote work", "Employees may work remotely up to 3 days per week with manager approval. Team meetings take place on Tuesday and Thursday. Work devices must use the company VPN when connecting outside the office."),
        ("Expense reimbursement", "The meal expense limit is 40 dollars per person per day while on approved business travel. Keep itemized receipts. Submit expense reports within 14 days after the trip. Personal purchases are not reimbursable."),
    ],
}


def make_pdf(pages):
    buffer = BytesIO()
    canvas = Canvas(buffer, pagesize=A4, invariant=1, pageCompression=1)
    canvas.setTitle("Synthetic RAG test document")
    for number, (title, text) in enumerate(pages, 1):
        canvas.setFont("Helvetica-Bold", 18)
        canvas.drawString(48, 780, title)
        canvas.setFont("Helvetica", 12)
        for line, y in zip(simpleSplit(text, "Helvetica", 12, 490), range(740, 120, -20)):
            canvas.drawString(48, y, line)
        canvas.setFont("Helvetica", 10)
        canvas.drawString(48, 48, f"Synthetic teaching fixture | Page {number}")
        canvas.showPage()
    canvas.save()
    return buffer.getvalue()


def create_fixtures(directory):
    directory = Path(directory)
    directory.mkdir(parents=True, exist_ok=True)
    for name, pages in FIXTURES.items():
        path = directory / name
        data = make_pdf(pages)
        if path.exists() and path.read_bytes() != data:
            raise ValueError("Refusing to overwrite a different PDF; use an empty demo directory.")
        path.write_bytes(data)
    return [directory / name for name in FIXTURES]


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="data/pdfs")
    args = parser.parse_args()
    for file in create_fixtures(args.output):
        print(file.name)
