from pydantic import BaseModel
from typing import List
from app.models.user import User
from app.models.cell import Cell
from app.models.token import Token

class World(BaseModel):
    map_image: str
    users: List[User] = []
    cells: List[Cell] = []
    tokens: List[Token] = []