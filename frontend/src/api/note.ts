import { Note } from '../models/note';

const BASE_URL = "http://localhost:8000"

// Pega todas as notas de uma célula
export async function getAllNotes(x: number, y: number): Promise<Note[]> {
    const response = await fetch(`${BASE_URL}/note/get_all_notes/${x}_${y}`);
    const data = await response.json();
    return data.notes || [];
}

// Cria nota
export async function createNote(
  x: number, y: number, authorId: number, content: string, isPublic: boolean
): Promise<number> {
    const response = await fetch(`${BASE_URL}/note/create_note/${x}_${y}/${authorId}/${isPublic}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message);
    return data.note_id;
}

// Salva nota
export async function saveNote(x: number, y: number, noteId: number, content: string) {
    const response = await fetch(`${BASE_URL}/note/save_note/${x}_${y}/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message);
}

// Deleta nota
export async function deleteNote(x: number, y: number, noteId: number) {
    const response = await fetch(`${BASE_URL}/note/delete_note/${x}_${y}/${noteId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message);
}
