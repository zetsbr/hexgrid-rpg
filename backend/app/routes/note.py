from fastapi import APIRouter, Body
from app.services import cell, note
from app.models.cell import Cell as cell_model

router = APIRouter(prefix="/note", tags=["note"])

# Instanciando os serviços
cell_service = cell.CellService()
note_service = note.NoteService()

@router.get("/get_all_notes/{x}_{y}")
def get_all_notes(x: int, y: int):
    if not cell_service.cell_exists(x, y):
        return {"notes": []}
    
    return note_service.get_all_notes(x, y)

@router.post("/create_note/{x}_{y}/{author_id}/{is_public}")
def create_note(x: int, y: int, author_id: int, is_public: bool, content: str = Body(...)):
    cell_instance = cell_service.get_cell(x, y) or cell_service.create_cell(x, y)
    if not cell_instance:
        return {"status": "error", "message": "Failed to create or retrieve cell"}
    
    note_id = note_service.create_note(x, y, author_id, content, is_public)
    if not note_id:
        return {"status": "error", "message": "Failed to create note"}

    return {"status": "ok", "note_id": note_id}

@router.post("/save_note/{x}_{y}/{note_id}")
def save_note(x: int, y: int, note_id: int, content: str = Body(...)):
    if not cell_service.cell_exists(x, y):
        return {"status": "error", "message": "Cell does not exist, flow error call the calvo"}
    
    if note_service.save_note(x, y, note_id, content):
        return {"status": "ok"}
    return {"status": "error", "message": "Failed to save note, try again"}

@router.delete("/delete_note/{x}_{y}/{note_id}")
def delete_note(x: int, y: int, note_id: int):
    if not cell_service.cell_exists(x, y):
        return {"status": "error", "message": "Cell does not exist, flow error call the calvo"}
    
    if note_service.delete_note(x, y, note_id):
        if not note_service.get_all_notes(x, y):
            cell_service.delete_cell(x, y)
        return {"status": "ok"}
    return {"status": "error", "message": "Failed to delete note, try again"}