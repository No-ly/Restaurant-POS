import pool from '../db.js';

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT id, nombre, rol FROM Usuarios ORDER BY nombre'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};