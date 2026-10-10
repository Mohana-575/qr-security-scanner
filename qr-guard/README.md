# QR Guard

Starter structure for the QR Guard frontend and backend. The frontend is React with Vite and Tailwind CSS; the API is FastAPI. SQLite persistence and JWT authentication are implemented; QR scanning is not.

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

Authentication endpoints are `POST /api/auth/register`, `POST /api/auth/login`, and `GET /api/auth/me`. Registration and login return a bearer token; send it as `Authorization: Bearer <token>` to access `/me`.

`POST /api/scan/decode` accepts an authenticated multipart image upload in the `file` field. It supports PNG, JPG, JPEG, and WEBP images up to 10 MB and returns the decoded text with an `is_url` flag. Decoded content is untrusted and is never visited. QR risk analysis is not implemented.

To configure the backend, copy `.env.example` to `.env` in the project root and replace `JWT_SECRET_KEY` with a random value of at least 32 characters (for example, generate one with `python -c "import secrets; print(secrets.token_urlsafe(48))"`). The API loads `DATABASE_URL`, `CORS_ORIGINS`, `ENVIRONMENT`, and JWT settings from that file or the process environment. SQLite is the default database. In development, startup automatically creates the `users` and `scans` tables; production schema changes should use migrations.

## Configuration and security

Never commit real secrets. `JWT_SECRET_KEY` in `.env.example` is a placeholder and the API refuses to start with it unchanged. Passwords are Argon2-hashed; QR risk analysis is not implemented.

To run backend tests, install `backend/requirements-dev.txt` and run `pytest` from the `backend` directory.