import React, { useEffect, useState } from 'react';
import { World } from '../models/world';
import { getWorld } from '../api/world';
import './world.css';

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
            {/* Aqui você pode sobrepor a grid de hexágonos e os tokens */}
        </div>
    );
}
