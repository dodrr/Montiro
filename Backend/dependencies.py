from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from database import SessionLocal
from auth import verify_token

oauth2_sheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_admin(token: str = Depends(oauth2_sheme)):
    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="неверный найден"
        )

    return payload


