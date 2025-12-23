from app.shared import world_repository
from app.models.cell import Cell

class CellService:
    def cell_exists(self, x: int, y: int) -> bool:
        """Verifica se a célula existe no world."""
        world = world_repository.load()
        return any(cell.x == x and cell.y == y for cell in world.cells)

    def get_cell(self, x: int, y: int) -> Cell | None:
        """Retorna a célula se existir, caso contrário None."""
        world = world_repository.load()
        for cell in world.cells:
            if cell.x == x and cell.y == y:
                return cell
        return None

    def create_cell(self, x: int, y: int) -> Cell:
        """Cria uma célula nova no world se estiver dentro dos limites, persiste e retorna a instância."""
        world = world_repository.load()
        if not (0 <= x < world.max_x) or not (0 <= y < world.max_y):
            raise ValueError(f"Coordinates ({x},{y}) out of world bounds ({world.max_x},{world.max_y})")
        new_cell = Cell(x=x, y=y, notes=[])
        world.cells.append(new_cell)
        world_repository.save(world)
        return new_cell

    def delete_cell(self, x: int, y: int) -> bool:
        """Deletes a cell from the world, returns True if successfully removed."""
        world = world_repository.load()
        cell_to_delete = next((c for c in world.cells if c.x == x and c.y == y), None)
        if cell_to_delete:
            world.cells.remove(cell_to_delete)
            world_repository.save(world)
            return True
        return False