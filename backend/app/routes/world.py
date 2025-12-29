from fastapi import APIRouter
from app.services.world import WorldService
from app.models.world import World
from app.repository.json_repository import JsonRepository
from fastapi.responses import FileResponse
from pathlib import Path

router = APIRouter(prefix="/world", tags=["world"])
world_service = WorldService()


@router.get("")
def get_world():
    """
    Retorna o estado completo do world
    """
    return world_service.get_world()

@router.post("")
def save_world(world: World):
    world_service.save_world(world)
    return {"status": "ok"}

@router.get("/map")
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