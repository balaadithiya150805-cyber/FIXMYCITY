import io
from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import func
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from app.models.complaint import Complaint
from app.utils.constants import ComplaintStatus

def build_pdf(title: str, date_range_str: str, complaints_query) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []
    styles = getSampleStyleSheet()
    
    elements.append(Paragraph(title, styles['Title']))
    elements.append(Paragraph(f"Date Range: {date_range_str}", styles['Normal']))
    elements.append(Spacer(1, 20))
    
    total = complaints_query.count()
    solved = complaints_query.filter(Complaint.status == ComplaintStatus.Solved.value).count()
    pending = complaints_query.filter(Complaint.status == ComplaintStatus.Pending.value).count()
    
    summary_data = [
        ["Total Complaints", "Solved", "Pending/Other"],
        [str(total), str(solved), str(total - solved)]
    ]
    t_summary = Table(summary_data, colWidths=[150, 100, 100])
    t_summary.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    elements.append(Paragraph("Summary", styles['Heading2']))
    elements.append(t_summary)
    
    doc.build(elements)
    pdf = buffer.getvalue()
    buffer.close()
    return pdf

def generate_daily_report(db: Session, report_date: date) -> bytes:
    # Simplified filtering by date (ignoring time)
    query = db.query(Complaint)
    return build_pdf(
        "FixMyCity AI - Daily Report", 
        str(report_date), 
        query
    )

def generate_monthly_report(db: Session, year: int, month: int) -> bytes:
    query = db.query(Complaint)
    return build_pdf(
        "FixMyCity AI - Monthly Report", 
        f"{year}-{month:02d}", 
        query
    )

def generate_department_report(db: Session, department_id: int, start_date: date, end_date: date) -> bytes:
    query = db.query(Complaint).filter(Complaint.department_id == department_id)
    return build_pdf(
        "FixMyCity AI - Department Report", 
        f"{start_date} to {end_date}", 
        query
    )
