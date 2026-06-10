from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.schemas.auth_schema import RegisterRequest
from app.utils.security import hash_password, verify_password

def create_user(db: Session, data: RegisterRequest) -> User:
    if get_user_by_email(db, data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_pwd = hash_password(data.password)
    user = User(
        name=data.name,
        email=data.email,
        phone=data.phone,
        password_hash=hashed_pwd,
        role=data.role or "citizen"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str) -> User:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user

def get_user_by_email(db: Session, email: str) -> User:
    return db.query(User).filter(User.email == email).first()

def get_all_users(db: Session) -> list[User]:
    return db.query(User).all()
