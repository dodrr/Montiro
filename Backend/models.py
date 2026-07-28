from sqlalchemy import Column,Text, String, Float, Integer, Boolean
from database import Base

class Products(Base):
    __tablename__ = "products"

    id = Column(Integer,primary_key=True)
    brand = Column(String(100))
    name = Column(String(100))
    collection = Column(String(100))
    category = Column(String(100))
    price = Column(Integer)
    rating = Column(Float)
    mechanism = Column(String(100))
    case_material = Column(String(100))
    strap_material = Column(String(100))
    description = Column(Text)
    image = Column(String(100))
    images = Column(Text)
    in_stock = Column(Boolean)
    stock_left = Column(Integer)
    video = Column(String(100))

class Orders(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)

    watch = Column(String(100))
    customer = Column(String(100))
    price = Column(Integer)


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True)
    password = Column(String(255))