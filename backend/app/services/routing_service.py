from sqlalchemy.orm import Session
from app.models.department import Department

def route_to_department(db: Session, issue_type: str) -> Department:
    mapping = {
        "pothole": "Road Department",
        "road_damage": "Road Department",
        "garbage": "Sanitation Department",
        "illegal_dumping": "Sanitation Department",
        "water_leakage": "Water Board",
        "drainage_block": "Drainage Department",
        "streetlight_damage": "Electricity Department",
        "broken_sign_board": "Public Works Department",
        "unknown": "General Admin"
    }
    
    dept_name = mapping.get(issue_type, "General Admin")
    return db.query(Department).filter(Department.name == dept_name).first()
