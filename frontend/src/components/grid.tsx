import React from "react";
import { World } from "../models/world";
import Cell from "../components/cell";

interface GridProps {
    world: World;
    imgWidth: number;
    imgHeight: number;
}

export default function Grid({ world, imgWidth, imgHeight }: GridProps) {
    const cellWidth = imgWidth / world.max_x;
    const cellHeight = imgHeight / world.max_y;

    return (
        <>
            {Array.from({ length: world.max_y }, (_, row) =>
                Array.from({ length: world.max_x }, (_, col) => (
                    <div
                        key={`${row}-${col}`}
                        style={{
                            position: "absolute",
                            left: col * cellWidth,
                            top: row * cellHeight,
                            width: cellWidth,
                            height: cellHeight,
                        }}
                    >
                        <Cell x={col} y={row} />
                    </div>
                ))
            )}
        </>
    );
}

