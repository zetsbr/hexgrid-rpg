from app.shared import world_repository
from app.models.world import World

class WorldService:

    def get_world(self):
        return world_repository.load()

    def save_world(self,world: World) -> None:
        world_repository.save(world)

    