from app.shared import world_repository
from app.models.note import Note
from app.models.cell import Cell

class NoteService:
    def get_all_notes(self, x: int, y: int) -> list[Note]:
        """Retorna todas as notas de uma célula, ou lista vazia se não existir."""
        world = world_repository.load()
        cell = next((c for c in world.cells if c.x == x and c.y == y), None)
        if not cell:
            return []
        return cell.notes

    def create_note(self, x: int, y: int, author_id: int, content: str, is_public: bool) -> int | None:
        """Cria uma nota em uma célula e retorna o ID da nota."""
        world = world_repository.load()
        cell = next((c for c in world.cells if c.x == x and c.y == y), None)
        if not cell:
            return None
        note_id = max([n.id for n in cell.notes], default=-1) + 1
        new_note = Note(id=note_id, author_id=author_id, text=content, is_public=is_public)
        cell.notes.append(new_note)
        world_repository.save(world)
        return note_id

    def save_note(self, x: int, y: int, note_id: int, content: str) -> bool:
        """Atualiza o conteúdo de uma nota existente."""
        world = world_repository.load()
        cell = next((c for c in world.cells if c.x == x and c.y == y), None)
        if not cell:
            return False

        note = next((n for n in cell.notes if n.id == note_id), None)
        if not note:
            return False

        note.text = content
        world_repository.save(world)
        return True

    def delete_note(self, x: int, y: int, note_id: int) -> bool:
        """Deleta uma nota de uma célula. Retorna True se removida."""
        world = world_repository.load()
        cell = next((c for c in world.cells if c.x == x and c.y == y), None)
        if not cell:
            return False

        note = next((n for n in cell.notes if n.id == note_id), None)
        if not note:
            return False

        cell.notes.remove(note)
        world_repository.save(world)
        return True