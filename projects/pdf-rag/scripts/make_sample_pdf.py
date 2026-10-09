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



# Separate extended authentic learning fixture: does not change the 3-page
# beginner policy or its tested factual answers.
OVERLAP_OUT = OUT.with_name("Real_Chunk_Overlap_Demo.pdf")
OVERLAP_PARAGRAPHS = [
    "A school travel team keeps a written handoff record because several staff members may review the same request. "
    "Each stage receives a timestamp, an owner, a short reason and the next action required.",
    "The first reviewer checks completeness rather than approving spending. "
    "Missing contact details are returned to the applicant before funding is considered.",
    "The course coordinator assesses educational purpose and documents how the planned trip relates to the curriculum. "
    "This helps the finance team see why the expense was proposed.",
    "The faculty office records an independent signoff. "
    "A supervisor may ask for clarifications, but the applicant remains responsible for accurate details.",
    "The travel desk checks dates and transport preferences once the request is approved. "
    "An itinerary is only a planning proposal until a booking has been confirmed.",
    "A second colleague reviews receipts for clarity, legibility and relevant costs. "
    "Receipts should be associated with the corresponding request before financial review begins.",
    "The team groups related items under a case identifier so that different messages cannot accidentally create duplicate claims. "
    "A case identifier is not itself a financial approval.",
    "If one page of a long handbook is split into overlapping text chunks, words at a shared boundary appear in both chunks. "
    "That repeated span helps retrieval find sentences that straddle an arbitrary cut.",
    "A learner should inspect the exact shared words and the page number on every returned chunk. "
    "The overlap must not join text from unrelated PDF pages.",
    "The process finishes with a teaching-only audit record showing actions and handoffs. "
    "The example describes imaginary staff and must not be mistaken for a real university policy.",
]

def make_overlap_demo() -> None:
    OVERLAP_OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OVERLAP_OUT), pagesize=A4)
    pdf.setTitle("Real PDF Chunk Overlap - Original Learning Example")
    pdf.setFont("Helvetica-Bold", 17)
    pdf.drawString(45, 795, "Chunk Boundary Exercise - One Long Page")
    pdf.setFont("Helvetica", 10)
    y = 750
    for paragraph in OVERLAP_PARAGRAPHS:
        for line in wrap(paragraph, width=102):
            if y <= 95:
                raise RuntimeError("Extended overlap fixture unexpectedly does not fit on one page")
            pdf.drawString(48, y, line)
            y -= 15
        y -= 7
    pdf.setFont("Helvetica-Oblique", 9)
    pdf.drawString(48, 42, "Original learning fixture / artificial policy / not official advice")
    pdf.showPage()
    pdf.save()
    print(f"Created {OVERLAP_OUT} ({OVERLAP_OUT.stat().st_size} bytes)")

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
    make_overlap_demo()


if __name__ == "__main__":
    main()
