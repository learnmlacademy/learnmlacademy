"""Make a fully original, reproducible three-page class PDF (not a real policy)."""
from __future__ import annotations
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

OUT = Path(__file__).resolve().parents[1] / "sample_docs" / "Campus_Travel_Policy.pdf"
SECTIONS = [
    ("Campus Travel Policy - 2026", [
        "LearnMLAcademy University - illustrative training document, not a real policy.",
        "1. Who may travel?",
        "Students attending university-approved academic conferences may request travel support.",
        "Submit the trip purpose, expected costs, and a host invitation before approval.",
        "Conference travel needs a faculty supervisor's written signature.",
    ]),
    ("Page 2: Booking and reimbursement", [
        "2. Booking rules",
        "Approved students book economy-class travel only after written approval.",
        "Keep digital receipts for train tickets, flights and accommodation.",
        "3. Reimbursement timeline",
        "Submit the reimbursement form and original receipts within 14 calendar days after returning.",
        "The finance team aims to reimburse approved claims within 30 calendar days of submission.",
        "Claims without proof of payment may be rejected after review.",
    ]),
    ("Page 3: Cancellations and contacts", [
        "4. Cancellation rule",
        "If travel is cancelled, the student must notify the travel desk within 48 hours of learning of the cancellation.",
        "Non-refundable costs are considered only when cancellation resulted from an official university decision.",
        "5. Emergency contact",
        "For urgent changes, contact the fictional travel desk at 555-0100 during office hours.",
        "Students may appeal a denial to the dean within seven calendar days.",
        "This sample is for practicing page-aware question answering.",
    ]),
]


def wrap(text: str, width: int = 88):
    words, rows, current = text.split(), [], []
    for word in words:
        if current and len(" ".join(current + [word])) > width:
            rows.append(" ".join(current))
            current = [word]
        else:
            current.append(word)
    if current:
        rows.append(" ".join(current))
    return rows


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUT), pagesize=A4)
    pdf.setTitle("LearnMLAcademy Synthetic Campus Travel Policy")
    for page_number, (heading, paragraphs) in enumerate(SECTIONS, 1):
        pdf.setFont("Helvetica-Bold", 17)
        pdf.drawString(45, 795, heading)
        y = 751
        pdf.setFont("Helvetica", 11)
        for paragraph in paragraphs:
            for line in wrap(paragraph):
                pdf.drawString(48, y, line)
                y -= 18
            y -= 15
        pdf.setFont("Helvetica-Oblique", 9)
        pdf.drawString(48, 42, f"Original teaching fixture / not official advice / page {page_number}")
        pdf.showPage()
    pdf.save()
    print(f"Created {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
