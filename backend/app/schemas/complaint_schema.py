from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.schemas.user_schema import UserResponse
from app.schemas.department_schema import DepartmentResponse

class ComplaintCreate(BaseModel):
    title: str
    description: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None

class StatusLogResponse(BaseModel):
    id: int
    complaint_id: int
    old_status: str
    new_status: str
    changed_by: int
    remarks: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class ComplaintResponse(BaseModel):
    id: int
    complaint_code: str
    title: str
    description: str
    image_path: Optional[str]
    solved_image_path: Optional[str]
    predicted_issue_type: Optional[str]
    confidence_score: Optional[float]
    severity: Optional[str]
    priority: str
    latitude: Optional[float]
    longitude: Optional[float]
    address: Optional[str]
    status: str
    duplicate_of: Optional[int]
    duplicate_count: int
    created_at: datetime
    updated_at: datetime
    solved_at: Optional[datetime]
    
    user: UserResponse
    department: Optional[DepartmentResponse]

    class Config:
        from_attributes = True

class ComplaintStatusUpdate(BaseModel):
    status: str
    remarks: Optional[str] = None

class ComplaintListResponse(BaseModel):
    total: int
    complaints: List[ComplaintResponse]
