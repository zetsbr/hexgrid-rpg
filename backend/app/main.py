from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import FileResponse
from app.routes import world, note, token
from app.repository.json_repository import JsonRepository

app = FastAPI(
    title="Hexgrid RPG Backend",
    description="Backend API para o projeto de mapa hexagonal RPG com notas e tokens.",
    version="0.1.0"
)

app.include_router(world.router)
app.include_router(note.router)
app.include_router(token.router)

@app.get("/")
def root():
    return {"message": "Hex Map Backend is running"}

@app.get("/world/map")
def get_world_map():
    world_repository = JsonRepository()
    world = world_repository.load()

    map_path = Path(world.map_image)

    if not map_path.exists():
        return {"status": "error", "message": "Failed to get world map image"}

    return FileResponse(
        path=map_path,
        media_type="image/png"
    )
