from pydantic import BaseModel 
from typing import Optional


class ProductSchema(BaseModel):
    name: str
    brand: str
    price: int
    collection: str
    category: str
    rating: float
    mechanism: str
    case_material: str
    strap_material: str
    description: str
    image: str
    images: Optional[list[str]] = None
    in_stock: bool
    stock_left: Optional[int] = None
    video: Optional[str] = None

class OrderSchema(BaseModel):
    watch:str 
    customer:str 
    price:int
    product_id = Optional[int] = None

class OrderStatusUpdate(BaseModel):
    status: str
    
class AdminLogin(BaseModel):
    password: str