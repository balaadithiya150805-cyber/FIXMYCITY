from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from app.models.complaint import Complaint
from app.utils.constants import ComplaintStatus

def find_duplicates(db: Session, issue_type: str, latitude: float, longitude: float, radius_km: float = 0.5) -> List[Complaint]:
    if latitude is None or longitude is None:
        return []
        
    # Roughly 1 degree of latitude = ~111 km. 
    # 0.5 km is roughly 0.0045 degrees.
    threshold = 0.0045
    
    duplicates = db.query(Complaint).filter(
        Complaint.issue_type == issue_type,
        Complaint.status.not_in([ComplaintStatus.Solved.value, ComplaintStatus.Rejected.value]),
        func.abs(Complaint.latitude - latitude) < threshold,
        func.abs(Complaint.longitude - longitude) < threshold
    ).all()
    
    return duplicates

def mark_as_duplicate(db: Session, complaint_id: int, duplicate_of_id: int):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    parent = db.query(Complaint).filter(Complaint.id == duplicate_of_id).first()
    
    if complaint and parent:
        complaint.duplicate_of = parent.id
        parent.duplicate_count += 1
        db.commit()
