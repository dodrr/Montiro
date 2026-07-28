from fastapi import APIRouter, HTTPException
from schemas import AdminLogin
from auth import create_token

router = APIRouter()

ADMIN_LOGIN = "123"

@router.post("/admin/login")
def admin_login(data: AdminLogin):
    if data.password != ADMIN_LOGIN:
        raise HTTPException(status_code=401, detail="Неверный пароль") 
    
    token = create_token({"sub": "admin"})
    return {"token": token}