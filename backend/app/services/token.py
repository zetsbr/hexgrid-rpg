from app.shared import world_repository
from app.models.token import Token

class TokenService:
    DEFAULT_TOKEN_POSITION = (-1, -1)

    def create_token(self, name: str) -> int:
        """Cria um novo token com posição inicial fora da grid (bandeja) e retorna seu ID."""
        world = world_repository.load()
        token_id = max([t.id for t in world.tokens], default=-1) + 1
        x, y = self.DEFAULT_TOKEN_POSITION
        new_token = Token(id=token_id, name=name, x=x, y=y)
        world.tokens.append(new_token)
        world_repository.save(world)
        return token_id

    def delete_token(self, token_id: int) -> bool:
        """Deleta um token pelo ID."""
        world = world_repository.load()
        token_to_delete = next((t for t in world.tokens if t.id == token_id), None)
        if token_to_delete:
            world.tokens.remove(token_to_delete)
            world_repository.save(world)
            return True
        return False

    def move_token(self, token_id: int, new_x: int, new_y: int) -> bool:
        """
        Move o token para uma nova posição dentro dos limites da grid.
        Retorna True se o movimento foi realizado, False caso contrário.
        """
        world = world_repository.load()
        if not (0 <= new_x <= world.max_x and 0 <= new_y <= world.max_y):
            return False

        token = next((t for t in world.tokens if t.id == token_id), None)
        if not token:
            return False

        token.x = new_x
        token.y = new_y
        world_repository.save(world)
        return True


    def rename_token(self, token_id: int, new_name: str) -> bool:
        """Renomeia o token pelo ID. Retorna True se sucesso, False se não encontrado."""
        world = world_repository.load()
        token = next((t for t in world.tokens if t.id == token_id), None)
        if token:
            token.name = new_name
            world_repository.save(world)
            return True
        return False