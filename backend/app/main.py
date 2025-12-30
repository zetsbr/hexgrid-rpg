from fastapi import FastAPI
from app.routes import world, note, token
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Hexgrid RPG Backend",
    description="Backend API para o projeto de mapa hexagonal RPG com notas e tokens.",
    version="0.1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:5173"] para restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(world.router)
app.include_router(note.router)
app.include_router(token.router)

@app.get("/")
def root():
    return {"message": "Hex Map Backend is running"}


