from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Products
from schemas import ProductSchema
from dependencies import get_db, get_current_admin

router = APIRouter()

@router.post("/product")
def create_product(product: ProductSchema, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    db_product = Products(
        name=product.name,
        brand=product.brand,
        price=product.price,
        category=product.category,
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/product")
def get_product(max_price: int = None, db: Session = Depends(get_db)):
    if max_price is not None:
        return db.query(Products).filter(Products.price <= max_price).all()
    return db.query(Products).all()
        
@router.get("/product/{id}")
def get_id_product(id:int, db: Session = Depends(get_db)):
    db_products = db.query(Products).filter(Products.id == id).first()

    if not db_products:
        raise HTTPException(status_code=404,detail="Товар не найден")
    
    return db_products

@router.put("/product/{id}")
def update_product(id: int,product: ProductSchema, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    db_products = db.query(Products).filter(Products.id == id).first()

    if not db_products:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    db_products.brand = product.brand
    db_products.name = product.name
    db_products.price = product.price
    db_products.category = product.category

    db.commit()

    db.refresh(db_products)

    return db_products

@router.delete("/product/{id}")
def delete_product(id: int, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    db_product = db.query(Products).filter(Products.id == id).first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    db.delete(db_product)

    db.commit()

    return {
        "message": "Товар удален"
    }

