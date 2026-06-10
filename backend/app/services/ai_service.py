import random
import os

# DUMMY/PLACEHOLDER AI detection
# Designed to be easily replaced by a real computer vision model (e.g. YOLOX, OpenCV)

def predict_issue(image_path: str) -> dict:
    filename = os.path.basename(image_path).lower()
    
    keywords = {
        "pothole": "high",
        "garbage": "medium",
        "water": "high", # mapped to water_leakage
        "drain": "high", # mapped to drainage_block
        "streetlight": "medium", # mapped to streetlight_damage
        "road": "high", # mapped to road_damage
        "dump": "high", # mapped to illegal_dumping
        "sign": "medium", # mapped to broken_sign_board
    }
    
    issue_type_mapping = {
        "water": "water_leakage",
        "drain": "drainage_block",
        "streetlight": "streetlight_damage",
        "road": "road_damage",
        "dump": "illegal_dumping",
        "sign": "broken_sign_board"
    }
    
    detected_issue = None
    severity = "low"
    confidence = 0.0
    
    for key, sev in keywords.items():
        if key in filename:
            detected_issue = issue_type_mapping.get(key, key)
            severity = sev
            confidence = round(random.uniform(0.75, 0.95), 2)
            break
            
    if not detected_issue:
        all_issues = list(issue_type_mapping.values()) + ["pothole", "garbage", "unknown"]
        detected_issue = random.choice(all_issues)
        severity = "low" if detected_issue == "unknown" else random.choice(["low", "medium", "high"])
        confidence = round(random.uniform(0.5, 0.7), 2)
        
    return {
        "issue_type": detected_issue,
        "confidence": confidence,
        "severity": severity
    }
