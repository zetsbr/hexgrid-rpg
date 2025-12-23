from fastapi import FastAPI
from app.routes import cell, token, note, map

app = FastAPI(
    title="Hexgrid RPG Backend",
    description="Backend API para o projeto de mapa hexagonal RPG com notas e tokens.",
    version="0.1.0"
)

app.include_router(cell.router, prefix="/cells", tags=["Cells"])
app.include_router(token.router, prefix="/tokens", tags=["Tokens"])
app.include_router(note.router, prefix="/notes", tags=["Notes"])
app.include_router(map.router, prefix="/map", tags=["Map"])

@app.get("/")
def root():
    return {"message": "Hex Map Backend is running"}