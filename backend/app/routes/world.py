from fastapi import APIRouter
from app.services.world import WorldService
from app.models.world import World

router = APIRouter(prefix="/world", tags=["world"])
service = WorldService()


@router.get("")
def get_world():
    """
    Retorna o estado completo do world
    """
    return service.get_world()

@router.post("")
def save_world(world: World):
    service.save_world(world)
    return {"status": "ok"}