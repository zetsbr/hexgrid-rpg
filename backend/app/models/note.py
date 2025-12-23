from dataclasses import dataclass

@dataclass
class Note:
    id: int
    author_id: int
    text: str
    is_public: bool