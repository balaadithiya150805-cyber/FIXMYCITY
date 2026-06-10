from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.user import User
from app.models.department import Department
from app.schemas.department_schema import DepartmentCreate, DepartmentUpdate, DepartmentResponse
from app.utils.security import get_current_user, require_role

router = APIRouter(prefix="/departments", tags=["Departments"])

@router.get("/", response_model=List[DepartmentResponse])
def list_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()

@router.post("/", response_model=DepartmentResponse)
def create_department(dept: DepartmentCreate, db: Session = Depends(get_db), current_user: User = Depends(require_role(["admin"]))):
    new_dept = Department(**dept.model_dump())
    db.add(new_dept)
    db.commit()
    db.refresh(new_dept)
    return new_dept

@router.put("/{department_id}", response_model=DepartmentResponse)
def update_department(department_id: int, dept_update: DepartmentUpdate, db: Session = Depends(get_db), current_user: User = Depends(require_role(["admin"]))):
    dept = db.query(Department).filter(Department.id == department_id).first()
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
        
    for key, value in dept_update.model_dump(exclude_unset=True).items():
        setattr(dept, key, value)
        
    db.commit()
    db.refresh(dept)
    return dept
