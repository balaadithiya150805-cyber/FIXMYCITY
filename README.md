# 🏙️ FixMyCity AI

### AI-Powered Smart Civic Issue Detection and Complaint Management System

> **Report. Detect. Route. Resolve.**

---

## 📋 Abstract

FixMyCity AI is a smart civic complaint management platform where citizens can upload images of public issues such as potholes, garbage overflow, water leakage, drainage blockage, streetlight damage, broken sign boards, illegal dumping, and road damage. The system automatically classifies the issue using AI, assigns priority, routes the complaint to the correct department, displays complaints on a map, allows status tracking, and generates admin reports.

---

## ✨ Features

### 🔍 AI-Powered Issue Detection
- Automatic classification of civic issues from uploaded images
- Confidence scoring and severity assessment
- Modular AI service (ready for YOLOX/OpenCV integration)

### 🎯 Smart Priority Engine
- Automatic priority calculation based on issue type, AI confidence, and duplicate count
- Priority levels: Low, Medium, High, Urgent

### 🚦 Department Routing Engine
- Automatic routing of complaints to the correct department
- 7 default departments covering all civic issue categories

### 🗺️ Interactive Map View
- Leaflet.js map with color-coded complaint markers
- Filter by status, priority, issue type, and department
- Popup details on marker click

### 📊 Admin Dashboard & Analytics
- Real-time complaint statistics
- Department-wise and issue-type-wise analytics
- Monthly complaint trends
- Recharts-powered interactive charts

### 📄 PDF Report Generation
- Daily, monthly, and department-specific reports
- Professional PDF layout using ReportLab

### 👥 Role-Based Access Control
- **Citizen**: Submit and track complaints
- **Staff**: Manage department-assigned complaints
- **Officer**: View analytics and reports
- **Admin**: Full system management

### 🔐 Security
- JWT token authentication
- BCrypt password hashing
- Protected API routes
- File upload validation

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| Tailwind CSS | Styling |
| React Router v6 | Routing |
| Axios | HTTP client |
| Recharts | Charts & analytics |
| React-Leaflet | Map visualization |
| Leaflet.js | Map engine |

### Backend
| Technology | Purpose |
|---|---|
| FastAPI | API framework |
| SQLAlchemy ORM | Database ORM |
| PostgreSQL | Database |
| JWT (python-jose) | Authentication |
| Passlib (bcrypt) | Password hashing |
| Pydantic | Data validation |
| ReportLab | PDF generation |
| python-multipart | File uploads |

---

## 📁 Folder Structure

```
fixmycity-ai/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry
│   │   ├── database.py          # SQLAlchemy engine & session
│   │   ├── config.py            # Environment configuration
│   │   ├── models/              # SQLAlchemy database models
│   │   │   ├── user.py
│   │   │   ├── department.py
│   │   │   ├── complaint.py
│   │   │   ├── complaint_status_log.py
│   │   │   └── complaint_file.py
│   │   ├── schemas/             # Pydantic request/response schemas
│   │   │   ├── user_schema.py
│   │   │   ├── auth_schema.py
│   │   │   ├── department_schema.py
│   │   │   ├── complaint_schema.py
│   │   │   └── report_schema.py
│   │   ├── routes/              # API route handlers
│   │   │   ├── auth.py
│   │   │   ├── complaints.py
│   │   │   ├── admin.py
│   │   │   ├── departments.py
│   │   │   ├── reports.py
│   │   │   └── ai.py
│   │   ├── services/            # Business logic services
│   │   │   ├── auth_service.py
│   │   │   ├── ai_service.py
│   │   │   ├── priority_service.py
│   │   │   ├── routing_service.py
│   │   │   ├── duplicate_service.py
│   │   │   ├── report_service.py
│   │   │   └── dashboard_service.py
│   │   ├── utils/               # Utility functions
│   │   │   ├── security.py
│   │   │   ├── file_utils.py
│   │   │   └── constants.py
│   │   └── uploads/             # Uploaded files directory
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── api/                 # API communication layer
│   │   │   ├── axios.js
│   │   │   ├── authApi.js
│   │   │   ├── complaintApi.js
│   │   │   ├── adminApi.js
│   │   │   └── reportApi.js
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── PriorityBadge.jsx
│   │   │   ├── ComplaintTable.jsx
│   │   │   ├── ComplaintMap.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/               # Page components by role
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── About.jsx
│   │   │   ├── TrackComplaint.jsx
│   │   │   ├── citizen/
│   │   │   ├── admin/
│   │   │   ├── staff/
│   │   │   └── officer/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
│
└── README.md                    # This file
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** >= 18.x
- **Python** >= 3.10
- **PostgreSQL** >= 14.x

### 1. Database Setup

```sql
-- Connect to PostgreSQL and create the database
CREATE DATABASE fixmycity_db;
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with your PostgreSQL credentials

# Run the server
uvicorn app.main:app --reload
```

The backend will start at **http://localhost:8000**

API documentation available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will start at **http://localhost:5173**

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/fixmycity_db
SECRET_KEY=change_this_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

---

## 👤 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@fixmycity.local | Admin@123 |
| Officer | officer@fixmycity.local | Officer@123 |
| Staff (Road) | road@fixmycity.local | Staff@123 |
| Staff (Sanitation) | sanitation@fixmycity.local | Staff@123 |
| Citizen | citizen@fixmycity.local | Citizen@123 |

> **Note:** Demo users and default departments are automatically seeded on first startup.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login & get token | No |
| GET | `/auth/me` | Get current user profile | Yes |

### Complaints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/complaints/` | Create new complaint | Citizen |
| GET | `/complaints/my` | Get citizen's complaints | Citizen |
| GET | `/complaints/all` | Get all complaints | Admin/Officer |
| GET | `/complaints/map` | Get complaints for map | Yes |
| GET | `/complaints/{id}` | Get complaint details | Yes |
| PUT | `/complaints/{id}/status` | Update complaint status | Staff/Admin |
| GET | `/complaints/department/{id}` | Get department complaints | Staff |

### Admin
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/admin/dashboard` | Get dashboard stats | Admin/Officer |
| GET | `/admin/users` | List all users | Admin |

### Departments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/departments/` | List departments | Yes |
| POST | `/departments/` | Create department | Admin |
| PUT | `/departments/{id}` | Update department | Admin |

### Reports
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/reports/daily` | Daily PDF report | Admin/Officer |
| GET | `/reports/monthly` | Monthly PDF report | Admin/Officer |
| GET | `/reports/department/{id}` | Department PDF report | Admin/Officer/Staff |

### AI Detection
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/ai/detect` | Detect issue from image | Yes |

---

## 🗺️ Default Departments

| # | Department |
|---|------------|
| 1 | Road Department |
| 2 | Sanitation Department |
| 3 | Water Board |
| 4 | Drainage Department |
| 5 | Electricity Department |
| 6 | Public Works Department |
| 7 | General Admin |

---

## 🤖 AI Issue Types

| Issue Type | Routes To | Default Severity |
|------------|-----------|-----------------|
| Pothole | Road Department | High |
| Road Damage | Road Department | High |
| Garbage | Sanitation Department | Medium |
| Illegal Dumping | Sanitation Department | High |
| Water Leakage | Water Board | High |
| Drainage Block | Drainage Department | High |
| Streetlight Damage | Electricity Department | Medium |
| Broken Sign Board | Public Works Department | Medium |

---

## 🔮 Future Enhancements

- [ ] Real AI model integration (YOLOX / OpenCV / TensorFlow)
- [ ] SMS/Email notifications
- [ ] Mobile app (React Native)
- [ ] Citizen feedback & ratings
- [ ] Escalation workflow with SLA timers
- [ ] Geofencing for area-based alerts
- [ ] Multi-language support (i18n)
- [ ] Real-time updates with WebSockets
- [ ] Photo comparison (before/after resolution)
- [ ] Citizen reward/gamification system
- [ ] Integration with municipal GIS systems
- [ ] Voice-based complaint registration
- [ ] Bulk import/export of complaint data

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**FixMyCity AI** — *Making cities smarter, one complaint at a time.* 🏙️

</div>
