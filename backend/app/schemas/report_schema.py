from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import date

class DashboardStats(BaseModel):
    total: int
    pending: int
    in_progress: int
    solved: int
    rejected: int
    urgent: int
    by_department: Dict[str, int]
    by_issue_type: Dict[str, int]
    monthly_trend: List[Dict[str, Any]]
    recent_complaints: List[Dict[str, Any]]

class ReportRequest(BaseModel):
    start_date: date
    end_date: date
    report_type: str
