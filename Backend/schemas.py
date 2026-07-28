from pydantic import BaseModel 


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
    images: list[str] = None
    in_stock: bool
    stock_left: int = None
    video: str = None

class OrderSchema(BaseModel):
    watch:str 
    customer:str 
    price:int

class AdminLogin(BaseModel):
    password: str