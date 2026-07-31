import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from schemas import AdminLogin
from auth import create_token, verify_password

load_dotenv()

ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

router = APIRouter()

@router.post("/admin/login")
def admin_login(data: AdminLogin):
    if not verify_password(data.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail="Неверный пароль")

    token = create_token({"sub": "admin"})
    return {"token": token}