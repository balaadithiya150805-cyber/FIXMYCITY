from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String(15), nullable=True)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="citizen")
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    department = relationship("Department", back_populates="staff")
    complaints = relationship("Complaint", back_populates="user")
    status_logs = relationship("ComplaintStatusLog", back_populates="user")
