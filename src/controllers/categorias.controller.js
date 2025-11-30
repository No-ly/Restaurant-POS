import pool from '../db.js';

export const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Categorias ORDER BY nombre');
        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }

        const [result] = await pool.execute(
            'INSERT INTO Categorias (nombre) VALUES (?)',
            [nombre]
        );
        
        res.status(201).json({
            id: result.insertId,
            nombre,
            message: 'Categoría creada exitosamente'
        });
    } catch (error) {
        console.error('Error creando categoría:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};