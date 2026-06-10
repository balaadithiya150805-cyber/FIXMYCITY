from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.models.complaint import Complaint
from app.models.department import Department
from app.utils.constants import ComplaintStatus, Priority

def get_admin_dashboard(db: Session) -> dict:
    total = db.query(Complaint).count()
    pending = db.query(Complaint).filter(Complaint.status == ComplaintStatus.Pending.value).count()
    in_progress = db.query(Complaint).filter(Complaint.status == ComplaintStatus.In_Progress.value).count()
    solved = db.query(Complaint).filter(Complaint.status == ComplaintStatus.Solved.value).count()
    rejected = db.query(Complaint).filter(Complaint.status == ComplaintStatus.Rejected.value).count()
    urgent = db.query(Complaint).filter(Complaint.priority == Priority.Urgent.value).count()
    
    dept_stats = db.query(Department.name, func.count(Complaint.id)).outerjoin(Complaint).group_by(Department.name).all()
    by_department = {name: count for name, count in dept_stats}
    
    issue_stats = db.query(Complaint.predicted_issue_type, func.count(Complaint.id)).group_by(Complaint.predicted_issue_type).all()
    by_issue_type = {issue or "unknown": count for issue, count in issue_stats}
    
    # Very basic monthly trend logic (placeholder for actual grouping query which can vary by DB dialect)
    monthly_trend = []
    
    recent_complaints = db.query(Complaint).order_by(Complaint.created_at.desc()).limit(10).all()
    
    # Ensure they are dictionaries for the schema
    recent = []
    for c in recent_complaints:
        dept_name = c.department.name if c.department else None
        recent.append({
            "id": c.id, "complaint_code": c.complaint_code, "title": c.title,
            "status": c.status, "priority": c.priority, "department": dept_name,
            "created_at": c.created_at
        })

    return {
        "total": total, "pending": pending, "in_progress": in_progress, "solved": solved,
        "rejected": rejected, "urgent": urgent, "by_department": by_department,
        "by_issue_type": by_issue_type, "monthly_trend": monthly_trend,
        "recent_complaints": recent
    }

def get_department_dashboard(db: Session, department_id: int) -> dict:
    base_query = db.query(Complaint).filter(Complaint.department_id == department_id)
    
    total = base_query.count()
    pending = base_query.filter(Complaint.status == ComplaintStatus.Pending.value).count()
    in_progress = base_query.filter(Complaint.status == ComplaintStatus.In_Progress.value).count()
    solved = base_query.filter(Complaint.status == ComplaintStatus.Solved.value).count()
    rejected = base_query.filter(Complaint.status == ComplaintStatus.Rejected.value).count()
    urgent = base_query.filter(Complaint.priority == Priority.Urgent.value).count()
    
    issue_stats = db.query(Complaint.predicted_issue_type, func.count(Complaint.id)).filter(Complaint.department_id == department_id).group_by(Complaint.predicted_issue_type).all()
    by_issue_type = {issue or "unknown": count for issue, count in issue_stats}
    
    recent_complaints = base_query.order_by(Complaint.created_at.desc()).limit(10).all()
    
    recent = []
    for c in recent_complaints:
        recent.append({
            "id": c.id, "complaint_code": c.complaint_code, "title": c.title,
            "status": c.status, "priority": c.priority, "department": None,
            "created_at": c.created_at
        })

    return {
        "total": total, "pending": pending, "in_progress": in_progress, "solved": solved,
        "rejected": rejected, "urgent": urgent, "by_department": {},
        "by_issue_type": by_issue_type, "monthly_trend": [],
        "recent_complaints": recent
    }

def get_officer_dashboard(db: Session) -> dict:
    return get_admin_dashboard(db)
