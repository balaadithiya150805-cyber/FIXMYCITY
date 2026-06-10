from enum import Enum

class ComplaintStatus(str, Enum):
    Pending = "Pending"
    Assigned = "Assigned"
    In_Progress = "In Progress"
    Solved = "Solved"
    Rejected = "Rejected"
    Reopened = "Reopened"
    Escalated = "Escalated"

class Priority(str, Enum):
    Low = "Low"
    Medium = "Medium"
    High = "High"
    Urgent = "Urgent"

class UserRole(str, Enum):
    citizen = "citizen"
    admin = "admin"
    staff = "staff"
    officer = "officer"

class IssueType(str, Enum):
    pothole = "pothole"
    garbage = "garbage"
    water_leakage = "water_leakage"
    drainage_block = "drainage_block"
    streetlight_damage = "streetlight_damage"
    road_damage = "road_damage"
    illegal_dumping = "illegal_dumping"
    broken_sign_board = "broken_sign_board"
    unknown = "unknown"

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'webp'}
