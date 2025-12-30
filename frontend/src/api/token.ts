import { Token } from '../models/token';

// Cria um token
export async function createToken(name: string): Promise<number> {
    const response = await fetch('http://localhost:8000/token/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message);
    return data.token_id;
}

// Move token
export async function moveToken(tokenId: number, newX: number, newY: number) {
    const response = await fetch(`http://localhost:8000/token/move/${tokenId}/${newX}_${newY}`, {
        method: 'POST'
    });
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message);
}

// Delete token
export async function deleteToken(tokenId: number) {
    const response = await fetch(`http://localhost:8000/token/delete/${tokenId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message);
}

// Rename token
export async function renameToken(tokenId: number, newName: string) {
    const response = await fetch(`http://localhost:8000/token/rename/${tokenId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_name: newName })
    });
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message);
}
