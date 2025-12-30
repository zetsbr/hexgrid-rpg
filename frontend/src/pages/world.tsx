import React, { useEffect, useState, useRef } from 'react';
import { World } from '../models/world';
import { getWorld } from '../api/world';
import Cell from '../components/cell';
import './world.css';

export default function WorldPage() {
    const [world, setWorld] = useState<World | null>(null);
    const [loading, setLoading] = useState(true);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        async function fetchWorld() {
            try {
                const data = await getWorld();
                setWorld(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchWorld();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!world) return <div>Falha ao carregar o world</div>;

    return (
        <div className="world-wrapper">
            <img
                src="/map.png"
                alt="World Map"
                ref={imageRef}
                className="world-image"
            />
            {/* Aqui a grid será sobreposta depois */}
        </div>
    );
}
