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

The API health check is available at `http://127.0.0.1:8000/health`; interactive API docs are at `http://127.0.0.1:8000/docs`.

## Configuration and security

Copy `.env.example` values into the appropriate local environment files when configuration is added. Never commit real secrets. `JWT_SECRET_KEY` is a placeholder, not a usable key. The backend currently exposes only a health check and does not load these settings yet.

JWT, password-hashing, SQLAlchemy, and Pydantic packages are listed for the upcoming stages; no authentication or database behavior is implemented in this scaffold.