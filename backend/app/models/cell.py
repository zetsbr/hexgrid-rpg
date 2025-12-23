from typing import List
from app.models.note import Note
from pydantic import BaseModel

class Cell(BaseModel):
    x: int
    y: int
    notes: List[Note] = []