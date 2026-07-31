from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from models import Products
from dependencies import get_db, get_current_admin
from schemas import ProductSchema

router = APIRouter()

@router.post("/product")
def create_product(product: ProductSchema, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    db_product = Products(
        name=product.name,
        brand=product.brand,
        price=product.price,
        collection=product.collection,
        category=product.category,
        rating=product.rating,
        mechanism=product.mechanism,
        case_material=product.case_material,
        strap_material=product.strap_material,
        description=product.description,
        image=product.image,
        images=product.images,
        in_stock=product.in_stock,
        stock_left=product.stock_left,
        video=product.video
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


@router.get("/product")
def get_products(max_price: int = None ,db: Session = Depends(get_db)):
    if max_price is not None:
        return db.query(Products).filter(Products.price <= max_price).all()
    return db.query(Products).all()

@router.get("/product/{id}")
def get_id_product(id: int, db: Session = Depends(get_db)):
    db_products = db.query(Products).filter(Products.id == id).first()

    if not db_products:
        raise HTTPException(
            status_code=404,
            detail="Товар не найден"
        )

    return db_products

@router.put("/product/{id}")
def update_product(id:int, product: ProductSchema, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    db_product = db.query(Products).filter(Products.id == id).first()

    if not db_product:
        raise HTTPException(
            status_code=404,
            detail="Товар не найден"
        )

    db_product.name = product.name
    db_product.brand = product.brand
    db_product.price = product.price
    db_product.collection = product.collection
    db_product.category = product.category
    db_product.rating = product.rating
    db_product.mechanism = product.mechanism
    db_product.case_material = product.case_material
    db_product.strap_material = product.strap_material
    db_product.description = product.description
    db_product.image = product.image
    db_product.images = product.images
    db_product.in_stock = product.in_stock
    db_product.stock_left = product.stock_left
    db_product.video = product.video

    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/product/{id}")
def delete_product(id: int, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    db_product = db.query(Products).filter(Products.id == id).first()

    if not db_product:
        raise HTTPException(
            status_code=404,
            detail="Товар не найден"
        )
    db.delete(db_product)
    db.commit()

    return {
        "message": "Товар удален"
    }
