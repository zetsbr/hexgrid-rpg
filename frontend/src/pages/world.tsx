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

    function handleImageLoad() {
        if (imageRef.current) {
            const { width, height } = imageRef.current;
            setImgSize({ width, height });
        }
    }

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

    if (loading) return <div>Loading world...</div>;
    if (!world) return <div>Falha ao carregar o world</div>;

    const cellsToRender =
        world && imgSize
            ? Array.from({ length: world.max_y }, (_, row) =>
                  Array.from({ length: world.max_x }, (_, col) => {
                      const cellWidth = imgSize.width / world.max_x;
                      const cellHeight = imgSize.height / world.max_y;

                      const xPos = (col + 0.5) * cellWidth; 
                      const yPos = (row + 0.5) * cellHeight;

                      return (
                          <div
                              key={`${row}-${col}`}
                              className="cell-wrapper"
                              style={{
                                  position: 'absolute',
                                  left: `${xPos}px`,
                                  top: `${yPos}px`,
                                  transform: 'translate(-50%, -50%)',
                                  width: `${cellWidth}px`,
                                  height: `${cellHeight}px`,
                              }}
                          >
                              <Cell x={col} y={row} />
                          </div>
                      );
                  })
              )
            : null;

    return (
        <div className="world-wrapper">
            <img
                src="/map.png"
                alt="World Map"
                ref={imageRef}
                className="world-image"
                onLoad={handleImageLoad}
            />
            {cellsToRender}
        </div>
    );
}
