from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from datetime import date
from typing import Optional

from app.database import get_db
from app.models.user import User
from app.utils.security import get_current_user, require_role
from app.services.report_service import generate_daily_report, generate_monthly_report, generate_department_report

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/daily")
def daily_report(
    report_date: Optional[date] = None, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_role(["admin", "officer"]))
):
    target_date = report_date or date.today()
    pdf_bytes = generate_daily_report(db, target_date)
    return Response(content=pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename=daily_report_{target_date}.pdf"})

@router.get("/monthly")
def monthly_report(
    year: int, 
    month: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_role(["admin", "officer"]))
):
    pdf_bytes = generate_monthly_report(db, year, month)
    return Response(content=pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename=monthly_report_{year}_{month}.pdf"})

@router.get("/department/{department_id}")
def department_report(
    department_id: int, 
    start_date: date, 
    end_date: date, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_role(["admin", "officer", "staff"]))
):
    pdf_bytes = generate_department_report(db, department_id, start_date, end_date)
    return Response(content=pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename=department_report_{department_id}.pdf"})
