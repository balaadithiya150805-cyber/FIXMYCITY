from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserResponse
from app.schemas.report_schema import DashboardStats
from app.utils.security import get_current_user, require_role
from app.services.dashboard_service import get_admin_dashboard

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard", response_model=DashboardStats)
def admin_dashboard(db: Session = Depends(get_db), current_user: User = Depends(require_role(["admin", "officer"]))):
    return get_admin_dashboard(db)

@router.get("/users", response_model=List[UserResponse])
def list_users(db: Session = Depends(get_db), current_user: User = Depends(require_role(["admin"]))):
    return db.query(User).all()
