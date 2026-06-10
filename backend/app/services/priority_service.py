from app.utils.constants import Priority

def calculate_priority(issue_type: str, confidence: float, severity: str, duplicate_count: int) -> str:
    if duplicate_count > 5:
        return Priority.Urgent.value
        
    if issue_type == "pothole" and confidence > 0.8:
        return Priority.High.value
        
    if issue_type == "water_leakage":
        if duplicate_count > 2:
            return Priority.Urgent.value
        return Priority.High.value
        
    if issue_type == "drainage_block":
        return Priority.High.value
        
    if issue_type == "garbage":
        if duplicate_count > 3:
            return Priority.High.value
        return Priority.Medium.value
        
    if issue_type == "streetlight_damage":
        if confidence > 0.85:
            return Priority.High.value
        return Priority.Medium.value
        
    if issue_type in ["road_damage", "illegal_dumping"]:
        return Priority.High.value
        
    if issue_type == "broken_sign_board":
        return Priority.Medium.value
        
    if confidence < 0.6:
        # Needs review, assigned Medium by default
        return Priority.Medium.value
        
    # Fallback to map severity string to Priority Enum
    severity_map = {
        "low": Priority.Low.value,
        "medium": Priority.Medium.value,
        "high": Priority.High.value
    }
    return severity_map.get(severity.lower(), Priority.Medium.value)
