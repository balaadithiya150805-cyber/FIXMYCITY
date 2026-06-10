from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional, List

from app.database import get_db
from app.models.user import User
from app.models.complaint import Complaint
from app.models.complaint_status_log import ComplaintStatusLog
from app.schemas.complaint_schema import ComplaintResponse, ComplaintListResponse, ComplaintStatusUpdate
from app.utils.security import get_current_user, require_role
from app.utils.file_utils import save_upload_file, validate_file_extension, validate_file_size, generate_complaint_code
from app.services.ai_service import predict_issue
from app.services.priority_service import calculate_priority
from app.services.routing_service import route_to_department
from app.services.duplicate_service import find_duplicates, mark_as_duplicate
from app.utils.constants import ComplaintStatus

router = APIRouter(prefix="/complaints", tags=["Complaints"])

@router.post("/", response_model=ComplaintResponse)
def create_complaint(
    title: str = Form(...),
    description: str = Form(...),
    latitude: Optional[float] = Form(None),
    longitude: Optional[float] = Form(None),
    address: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not validate_file_extension(file.filename):
        raise HTTPException(status_code=400, detail="Invalid file type")
    if not validate_file_size(file):
        raise HTTPException(status_code=400, detail="File too large")
        
    image_path = save_upload_file(file, subfolder="complaints")
    
    # AI Prediction
    ai_result = predict_issue(image_path)
    issue_type = ai_result["issue_type"]
    confidence = ai_result["confidence"]
    severity = ai_result["severity"]
    
    # Check duplicates
    duplicates = find_duplicates(db, issue_type, latitude, longitude)
    duplicate_count = len(duplicates)
    
    # Priority & Routing
    priority = calculate_priority(issue_type, confidence, severity, duplicate_count)
    department = route_to_department(db, issue_type)
    
    complaint_code = generate_complaint_code()
    
    complaint = Complaint(
        complaint_code=complaint_code,
        user_id=current_user.id,
        department_id=department.id if department else None,
        title=title,
        description=description,
        image_path=image_path,
        predicted_issue_type=issue_type,
        confidence_score=confidence,
        severity=severity,
        priority=priority,
        latitude=latitude,
        longitude=longitude,
        address=address,
        status=ComplaintStatus.Pending.value
    )
    
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    
    if duplicates:
        # Simple duplicate logic: mark first found as parent
        mark_as_duplicate(db, complaint.id, duplicates[0].id)
        db.refresh(complaint)
        
    return complaint

@router.get("/my", response_model=List[ComplaintResponse])
def get_my_complaints(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Complaint).filter(Complaint.user_id == current_user.id).order_by(Complaint.created_at.desc()).all()

@router.get("/all", response_model=ComplaintListResponse)
def get_all_complaints(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    department_id: Optional[int] = None,
    issue_type: Optional[str] = None,
    page: int = 1,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin", "officer"]))
):
    query = db.query(Complaint)
    
    if status: query = query.filter(Complaint.status == status)
    if priority: query = query.filter(Complaint.priority == priority)
    if department_id: query = query.filter(Complaint.department_id == department_id)
    if issue_type: query = query.filter(Complaint.predicted_issue_type == issue_type)
    
    total = query.count()
    complaints = query.order_by(Complaint.created_at.desc()).offset((page - 1) * limit).limit(limit).all()
    
    return {"total": total, "complaints": complaints}

@router.get("/map")
def get_map_complaints(db: Session = Depends(get_db)):
    complaints = db.query(Complaint).all()
    return [{
        "id": c.id, "complaint_code": c.complaint_code, "lat": c.latitude, "lon": c.longitude,
        "status": c.status, "priority": c.priority, "issue_type": c.predicted_issue_type,
        "department_name": c.department.name if c.department else "None",
        "title": c.title, "created_at": c.created_at
    } for c in complaints if c.latitude and c.longitude]

@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_complaint(complaint_id: int, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint

@router.put("/{complaint_id}/status", response_model=ComplaintResponse)
def update_complaint_status(
    complaint_id: int, 
    status_update: ComplaintStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin", "staff"]))
):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    old_status = complaint.status
    complaint.status = status_update.status
    
    status_log = ComplaintStatusLog(
        complaint_id=complaint.id,
        old_status=old_status,
        new_status=status_update.status,
        changed_by=current_user.id,
        remarks=status_update.remarks
    )
    db.add(status_log)
    db.commit()
    db.refresh(complaint)
    return complaint

@router.get("/department/{department_id}", response_model=List[ComplaintResponse])
def get_department_complaints(
    department_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin", "staff"]))
):
    return db.query(Complaint).filter(Complaint.department_id == department_id).all()
