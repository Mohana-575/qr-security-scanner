# QR Guard

Starter structure for the QR Guard frontend and backend. The frontend is React with Vite and Tailwind CSS; the API is FastAPI. Authentication, persistence, and QR scanning are not implemented yet.

## Requirements

- Node.js 20.19 or newer and npm
- Python 3.10 or newer

## Frontend

From the QR Guard project root:

```powershell
cd frontend
npm install
npm run dev
```

Vite prints the local development URL. To verify a production build, run `npm run build`.

## Backend

From the QR Guard project root:

```powershell
cd backend
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API health check is available at `http://127.0.0.1:8000/api/health`; interactive API docs are at `http://127.0.0.1:8000/docs`.

To configure the backend, copy `.env.example` to `.env` in the project root. The API loads `DATABASE_URL` and `CORS_ORIGINS` from that file or the process environment. SQLite is the default database; the SQLAlchemy engine and session dependency are ready for future routes.

## Configuration and security

Never commit real secrets. `JWT_SECRET_KEY` is a placeholder, not a usable key. Authentication and QR analysis are not implemented.

To run backend tests, install `backend/requirements-dev.txt` and run `pytest` from the `backend` directory.