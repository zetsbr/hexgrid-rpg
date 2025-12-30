import { World } from "../models/world";

const BASE_URL = "http://localhost:8000";

export async function getWorld(): Promise<World> {
    const res = await fetch(`${BASE_URL}/world`);
    if (!res.ok) {
        console.error('Falha ao buscar o world', res.status, res.statusText);
        throw new Error("Failed to fetch world");
    }
    const data: World = await res.json();
    return data;
}
