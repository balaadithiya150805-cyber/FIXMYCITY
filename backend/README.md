# FixMyCity AI - Backend

## Overview
FastAPI backend for the FixMyCity AI project. It handles user authentication, complaint processing (including AI integration and priority calculations), automated routing, and report generation.

## Setup
1. Create a virtual environment: `python -m venv venv`
2. Activate it: `venv\Scripts\activate` (Windows)
3. Install dependencies: `pip install -r requirements.txt`
4. Copy `.env.example` to `.env` and configure your database URL.
5. Make sure PostgreSQL is running and the database `fixmycity_db` is created.
6. Run the server: `uvicorn app.main:app --reload`

## API Endpoints
- `/auth/` - Authentication & Registration
- `/complaints/` - Submit, track, and manage complaints
- `/admin/` - Dashboard stats and user management
- `/departments/` - Manage city departments
- `/reports/` - Generate PDF reports
- `/ai/` - AI issue detection

## Demo Accounts
- Admin: admin@fixmycity.local / Admin@123
- Officer: officer@fixmycity.local / Officer@123
- Staff (Road): road@fixmycity.local / Staff@123
- Citizen: citizen@fixmycity.local / Citizen@123
