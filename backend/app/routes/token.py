from fastapi import APIRouter, Body
from app.services import token

router = APIRouter(prefix="/token", tags=["token"])

token_service = token.TokenService()

@router.post("/create")
def create_token(name: str = Body(...)):
    token_id = token_service.create_token(name)
    return {"status": "ok", "token_id": token_id}

@router.post("/move/{token_id}/{new_x}_{new_y}")
def move_token(token_id: int, new_x: int, new_y: int):
    if token_service.move_token(token_id, new_x, new_y):
        return {"status": "ok"}
    return {"status": "error", "message": "Invalid token ID or position out of bounds"}

@router.delete("/delete/{token_id}")
def delete_token(token_id: int):
    if token_service.delete_token(token_id):
        return {"status": "ok"}
    return {"status": "error", "message": "Token not found"}

@router.post("/rename/{token_id}")
def rename_token(token_id: int, new_name: str = Body(...)):
    if token_service.rename_token(token_id, new_name):
        return {"status": "ok"}
    return {"status": "error", "message": "Token not found"}