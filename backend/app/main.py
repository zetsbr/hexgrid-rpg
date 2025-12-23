from fastapi import FastAPI
from app.routes import world
from backend.app.routes import world

app = FastAPI(
    title="Hexgrid RPG Backend",
    description="Backend API para o projeto de mapa hexagonal RPG com notas e tokens.",
    version="0.1.0"
)

app.include_router(world.router, prefix="/map", tags=["Map"])

@app.get("/")
def root():
    return {"message": "Hex Map Backend is running"}