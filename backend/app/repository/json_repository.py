import json
from pathlib import Path
from app.models.world import World


class JsonRepository:
    def __init__(self, data_path: str = "data/world.json"):
        self.data_path = Path(data_path)

    def load(self) -> World:
        """
        Lê o JSON do disco e retorna um objeto World.
        """
        if not self.data_path.exists():
            raise FileNotFoundError(f"Arquivo não encontrado: {self.data_path}")

        with self.data_path.open("r", encoding="utf-8") as file:
            data = json.load(file)

        # Pydantic faz toda a mágica aqui
        return World.model_validate(data)

    def save(self, world: World) -> None:
        """
        Salva o objeto World no disco como JSON.
        """
        with self.data_path.open("w", encoding="utf-8") as file:
            json.dump(
                world.model_dump(),
                file,
                indent=2,
                ensure_ascii=False
            )
