import { Note } from "models/note";

export interface Cell {
    x: number;
    y: number;
    notes: Note[];
}
