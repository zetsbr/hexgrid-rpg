import React from 'react';
import './cell.css';

interface CellProps {
    x: number;
    y: number;
    onClick?: (x: number, y: number) => void;
}

export default function Cell({ x, y }: CellProps) {
    const handleClick = () => {
        console.log(`Clicked cell at (${x}, ${y})`);
    };

    return (
        <button className="hex-cell" onClick={handleClick}>
            {x !== undefined && y !== undefined ? `${x},${y}` : ""}
        </button>
    );
}
