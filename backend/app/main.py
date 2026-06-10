from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database import Base, engine, SessionLocal
from app.routes import auth_router, complaints_router, admin_router, departments_router, reports_router, ai_router
from app.models.department import Department
from app.models.user import User
from app.utils.security import hash_password

app = FastAPI(title="FixMyCity AI API", version="1.0.0", description="AI-Powered Smart Civic Issue Detection API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directory for uploads
os.makedirs("app/uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")

# Include routers
app.include_router(auth_router)
app.include_router(complaints_router)
app.include_router(admin_router)
app.include_router(departments_router)
app.include_router(reports_router)
app.include_router(ai_router)

def seed_data():
    db = SessionLocal()
    try:
        # Seed Departments
        departments = [
            "Road Department", "Sanitation Department", "Water Board", 
            "Drainage Department", "Electricity Department", 
            "Public Works Department", "General Admin"
        ]
        
        for dept_name in departments:
            if not db.query(Department).filter(Department.name == dept_name).first():
                db.add(Department(name=dept_name, description=f"{dept_name} handles related civic issues."))
        db.commit()

        # Seed Users
        road_dept = db.query(Department).filter(Department.name == "Road Department").first()
        sanitation_dept = db.query(Department).filter(Department.name == "Sanitation Department").first()
        
        demo_users = [
            {"name": "Admin User", "email": "admin@fixmycity.local", "role": "admin", "password": "Admin@123", "dept": None},
            {"name": "Officer User", "email": "officer@fixmycity.local", "role": "officer", "password": "Officer@123", "dept": None},
            {"name": "Road Staff", "email": "road@fixmycity.local", "role": "staff", "password": "Staff@123", "dept": road_dept.id if road_dept else None},
            {"name": "Sanitation Staff", "email": "sanitation@fixmycity.local", "role": "staff", "password": "Staff@123", "dept": sanitation_dept.id if sanitation_dept else None},
            {"name": "Citizen User", "email": "citizen@fixmycity.local", "role": "citizen", "password": "Citizen@123", "dept": None},
        ]
        
        for u in demo_users:
            if not db.query(User).filter(User.email == u["email"]).first():
                db.add(User(
                    name=u["name"],
                    email=u["email"],
                    password_hash=hash_password(u["password"]),
                    role=u["role"],
                    department_id=u["dept"]
                ))
        db.commit()
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    seed_data()

@app.get("/")
def root():
    return {"message": "Welcome to FixMyCity AI API"}
