import os
import uuid
import random
from datetime import datetime
from fastapi import UploadFile
from app.config import get_settings
from app.utils.constants import ALLOWED_EXTENSIONS

settings = get_settings()

def validate_file_extension(filename: str) -> bool:
    if not filename or "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in ALLOWED_EXTENSIONS

def validate_file_size(file: UploadFile) -> bool:
    file.file.seek(0, os.SEEK_END)
    size = file.file.tell()
    file.file.seek(0)
    return size <= settings.MAX_UPLOAD_SIZE

def save_upload_file(file: UploadFile, subfolder: str = "") -> str:
    base_dir = settings.UPLOAD_DIR
    target_dir = os.path.join(base_dir, subfolder) if subfolder else base_dir
    os.makedirs(target_dir, exist_ok=True)
    
    ext = file.filename.rsplit(".", 1)[1].lower() if "." in file.filename else "jpg"
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    file_path = os.path.join(target_dir, unique_filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
        
    return os.path.join(subfolder, unique_filename).replace("\\", "/")

def generate_complaint_code() -> str:
    date_str = datetime.now().strftime("%Y%m%d")
    random_digits = f"{random.randint(0, 9999):04d}"
    return f"FMC-{date_str}-{random_digits}"
