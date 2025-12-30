import React, { useEffect, useState } from 'react';
import { World } from '../models/world';
import { getWorld } from '../api/world';

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
    <div
        style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            backgroundImage: `url(/map.png)`, // Usa a URL retornada pelo getWorldMap
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <h1>World Grid</h1>
        {/* Grid de hexágonos e tokens vão aqui */}
    </div>
  );
}
