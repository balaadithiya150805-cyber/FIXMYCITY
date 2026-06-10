from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.utils.constants import ComplaintStatus, Priority

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    complaint_code = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    image_path = Column(String, nullable=True)
    solved_image_path = Column(String, nullable=True)
    predicted_issue_type = Column(String, nullable=True)
    confidence_score = Column(Float, nullable=True)
    severity = Column(String, nullable=True)
    priority = Column(String, default=Priority.Medium.value)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address = Column(String, nullable=True)
    status = Column(String, default=ComplaintStatus.Pending.value)
    duplicate_of = Column(Integer, ForeignKey("complaints.id"), nullable=True)
    duplicate_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    solved_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="complaints")
    department = relationship("Department", back_populates="complaints")
    status_logs = relationship("ComplaintStatusLog", back_populates="complaint")
    files = relationship("ComplaintFile", back_populates="complaint")
    
    # Self-referential relationship for duplicates
    parent_complaint = relationship("Complaint", remote_side=[id], backref="duplicates")
