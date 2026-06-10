from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.security import get_current_user
from app.utils.file_utils import save_upload_file, validate_file_extension, validate_file_size
from app.services.ai_service import predict_issue

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/detect")
def detect_issue(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    if not validate_file_extension(file.filename):
        raise HTTPException(status_code=400, detail="Invalid file type")
    if not validate_file_size(file):
        raise HTTPException(status_code=400, detail="File too large")
        
    # We save temporarily to run prediction, in real-world you might stream to model
    temp_path = save_upload_file(file, subfolder="temp")
    result = predict_issue(temp_path)
    return result
