import pool from '../db.js';

export const getIngredientes = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM Ingredientes ORDER BY nombre'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo ingredientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};