import React, { useEffect, useState } from 'react';
import { World } from '../models/world';
import { getWorld } from '../api/world';
import './world.css';
import Cell from '../components/cell';

export default function WorldPage() {
    const [world, setWorld] = useState<World | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchWorldAndMap() {
        try {
            const data = await getWorld();
            setWorld(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    fetchWorldAndMap();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!world) return <div>Falha ao carregar o world</div>;

    return (
        <div className="container">    
            <div className="cell-wrapper">
                <Cell x={0} y={0} />
            </div>
        </div>
    );
}
