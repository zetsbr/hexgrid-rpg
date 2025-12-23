from fastapi import FastAPI
from app.routes import world, note

app = FastAPI(
    title="Hexgrid RPG Backend",
    description="Backend API para o projeto de mapa hexagonal RPG com notas e tokens.",
    version="0.1.0"
)

app.include_router(world.router)
app.include_router(note.router)

@app.get("/")
def root():
    return {"message": "Hex Map Backend is running"}