from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class DepartmentCreate(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    description: Optional[str] = None

class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    description: Optional[str] = None

class DepartmentResponse(BaseModel):
    id: int
    name: str
    email: Optional[EmailStr]
    phone: Optional[str]
    description: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
