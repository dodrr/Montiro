import os
import time
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Request
from schemas import AdminLogin
from auth import create_token, verify_password

load_dotenv()

ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

router = APIRouter()

MAX_ATTEMPTS = 5
BLOCK_SECONDS = 5 * 60
_failed_attempts: dict[str, list[float]] = {}


def _is_blocked(ip: str) -> bool:
    now = time.time()
    attempts = [t for t in _failed_attempts.get(ip, []) if now - t < BLOCK_SECONDS]
    _failed_attempts[ip] = attempts
    return len(attempts) >= MAX_ATTEMPTS


def _register_failure(ip: str):
    _failed_attempts.setdefault(ip, []).append(time.time())


@router.post("/admin/login")
def admin_login(data: AdminLogin, request: Request):
    ip = request.client.host if request.client else "unknown"

    if _is_blocked(ip):
        raise HTTPException(
            status_code=429,
            detail="Слишком много неудачных попыток входа. Попробуйте позже."
        )

    if not verify_password(data.password, ADMIN_PASSWORD_HASH):
        _register_failure(ip)
        raise HTTPException(status_code=401, detail="Неверный пароль")

    token = create_token({"sub": "admin"})
    return {"token": token}