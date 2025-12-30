import { User } from "models/user";
import { Cell } from "models/cell";
import { Token } from "models/token";

export interface World {
    max_x: number;
    max_y: number;
    users: User[];
    cells: Cell[];
    tokens: Token[];
}
