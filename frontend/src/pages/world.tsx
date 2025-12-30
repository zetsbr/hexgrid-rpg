import React, { useEffect, useState, useRef } from 'react';
import { World } from '../models/world';
import { getWorld } from '../api/world';
import Cell from '../components/cell';
import './world.css';

export default function WorldPage() {
    const [world, setWorld] = useState<World | null>(null);
    const [loading, setLoading] = useState(true);
    const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);

    const imageRef = useRef<HTMLImageElement>(null);

    // Pega dimensões reais da imagem
    function handleImageLoad() {
        if (imageRef.current) {
            const { width, height } = imageRef.current;
            setImgSize({ width, height });
        }
    }

    // Carrega o world JSON
    useEffect(() => {
        async function fetchWorld() {
            try {
                const data = await getWorld();
                setWorld(data);
            } catch (err) {
                console.error('Erro ao carregar o world:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchWorld();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!world) return <div>Falha ao carregar o world</div>;

    // Renderiza as células apenas se já tiver as dimensões da imagem
    const cellsToRender =
        world && imgSize
            ? Array.from({ length: world.max_y }, (_, row) =>
                Array.from({ length: world.max_x }, (_, col) => {
                    const xPos = imageRef.current!.offsetLeft + (col / world.max_x) * imageRef.current!.width;
                    const yPos = imageRef.current!.offsetTop + (row / world.max_y) * imageRef.current!.height;  

                    return (
                        <div
                            key={`${row}-${col}`}
                            className="cell-wrapper"
                            style={{
                                position: 'absolute',
                                left: `${xPos}px`,
                                top: `${yPos}px`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <Cell x={col} y={row} />
                        </div>
                    );
                })
            )
        : null;

    return (
        <div className="container">
            <img
                src="/map.png"
                alt="World Map"
                className="background-image"
                ref={imageRef}
                onLoad={handleImageLoad}
            />
            {cellsToRender}
        </div>
    );
}
