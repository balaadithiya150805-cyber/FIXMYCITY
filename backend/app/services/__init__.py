from app.services.auth_service import create_user, authenticate_user, get_user_by_email, get_all_users
from app.services.ai_service import predict_issue
from app.services.priority_service import calculate_priority
from app.services.routing_service import route_to_department
from app.services.duplicate_service import find_duplicates, mark_as_duplicate
from app.services.dashboard_service import get_admin_dashboard, get_department_dashboard, get_officer_dashboard
from app.services.report_service import generate_daily_report, generate_monthly_report, generate_department_report

__all__ = [
    "create_user", "authenticate_user", "get_user_by_email", "get_all_users",
    "predict_issue",
    "calculate_priority",
    "route_to_department",
    "find_duplicates", "mark_as_duplicate",
    "get_admin_dashboard", "get_department_dashboard", "get_officer_dashboard",
    "generate_daily_report", "generate_monthly_report", "generate_department_report"
]
