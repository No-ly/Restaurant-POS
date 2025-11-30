import pool from '../db.js';

export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT p.*, c.nombre as categoria_nombre 
            FROM Productos p 
            JOIN Categorias c ON p.id_categoria = c.id 
            ORDER BY p.nombre
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createProducto = async (req, res) => {
    try {
        const { nombre, precio, imagen_url, area_cocina, id_categoria } = req.body;
        
        // Validaciones básicas
        if (!nombre || !precio || !id_categoria) {
            return res.status(400).json({ 
                error: 'Nombre, precio e id_categoria son requeridos' 
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO Productos (nombre, precio, imagen_url, area_cocina, id_categoria) VALUES (?, ?, ?, ?, ?)',
            [nombre, precio, imagen_url || null, area_cocina || null, id_categoria]
        );
        
        res.status(201).json({
            id: result.insertId,
            nombre,
            precio,
            imagen_url,
            area_cocina,
            id_categoria,
            message: 'Producto creado exitosamente'
        });
    } catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getProductIngredients = async (req, res) => {
    try {
        const productId = req.params.id;
        
        if (!productId) {
            return res.status(400).json({ error: 'ID de producto requerido' });
        }

        const [rows] = await pool.execute(`
            SELECT 
                i.id,
                i.nombre,
                i.precio_extra,
                pi.cantidad_default,
                pi.es_modificable,
                CASE WHEN pi.cantidad_default > 0 THEN 1 ELSE 0 END as es_default
            FROM Ingredientes i
            INNER JOIN Producto_Ingredientes pi ON i.id = pi.id_ingrediente
            WHERE pi.id_producto = ?
            ORDER BY i.nombre
        `, [productId]);

        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo ingredientes del producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};