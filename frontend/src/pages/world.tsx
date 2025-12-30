import React, { useEffect, useRef, useState } from "react";
import { World } from "../models/world";
import { getWorld } from "../api/world";
import Grid from "../components/grid";
import "./world.css";

export default function WorldPage() {
    const [world, setWorld] = useState<World | null>(null);
    const [loading, setLoading] = useState(true);
    const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);
    const [zoom, setZoom] = useState(1);

    const imageRef = useRef<HTMLImageElement>(null);

    function handleImageLoad() {
        if (!imageRef.current) return;

        setImgSize({
            width: imageRef.current.naturalWidth,
            height: imageRef.current.naturalHeight,
        });
    }

    function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
        if (!e.altKey) return;
        e.preventDefault();
        setZoom(prev => {
            const next = prev - e.deltaY * 0.001;
            return Math.min(Math.max(next, 0.5), 3); // limites
        });
    }

    useEffect(() => {
        async function fetchWorld() {
            try {
                const data = await getWorld();
                setWorld(data);
            } catch (err) {
                console.error("Erro ao carregar o world:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchWorld();
    }, []);

    if (loading) return <div>Loading world...</div>;
    if (!world) return <div>Falha ao carregar o world</div>;

    return (
        <div className="world-viewport" onWheel={handleWheel}>
            <div
                className="world-canvas"
                style={{ transform: `scale(${zoom})` }}
            >
                <img
                    src="/map.png"
                    alt="World Map"
                    ref={imageRef}
                    className="world-image"
                    onLoad={handleImageLoad}
                    draggable={false}
                />

                {imgSize && (
                    <Grid
                        world={world}
                        imgWidth={imgSize.width}
                        imgHeight={imgSize.height}
                    />
                )}
            </div>
        </div>
    );
}
