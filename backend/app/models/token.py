from pydantic import BaseModel

class Token(BaseModel):
    id: int
    name: str
    x: int
    y: int