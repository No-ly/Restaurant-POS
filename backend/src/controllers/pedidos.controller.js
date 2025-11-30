import pool from '../db.js';

export const createPedido = async (req, res) => {
    let connection;
    try {
        const { id_usuario, mesa, total, items } = req.body;
        
        // Validaciones básicas
        if (!id_usuario || !mesa || !total || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ 
                error: 'id_usuario, mesa, total y items (array no vacío) son requeridos' 
            });
        }

        // Obtener conexión dedicada para la transacción
        connection = await pool.getConnection();
        
        // Iniciar transacción
        await connection.beginTransaction();

        // 1. Insertar en tabla Pedidos
        const [pedidoResult] = await connection.execute(
            'INSERT INTO Pedidos (fecha, id_usuario, mesa, total, estado) VALUES (NOW(), ?, ?, ?, ?)',
            [id_usuario, mesa, total, 'Pendiente']
        );

        const id_pedido = pedidoResult.insertId;

        // 2. Insertar items en Detalle_Pedido
        for (const item of items) {
            const { id_producto, cantidad, precio_unitario, especificaciones } = item;
            
            if (!id_producto || !cantidad || !precio_unitario) {
                throw new Error('Cada item debe tener id_producto, cantidad y precio_unitario');
            }

            await connection.execute(
                'INSERT INTO Detalle_Pedido (id_pedido, id_producto, cantidad, precio_unitario, especificaciones) VALUES (?, ?, ?, ?, ?)',
                [id_pedido, id_producto, cantidad, precio_unitario, especificaciones || '']
            );
        }

        // Confirmar transacción
        await connection.commit();

        res.status(201).json({
            id_pedido,
            message: 'Pedido creado exitosamente',
            total_items: items.length,
            total
        });

    } catch (error) {
        // Rollback en caso de error
        if (connection) {
            await connection.rollback();
        }
        
        console.error('Error creando pedido:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor al crear el pedido',
            details: error.message 
        });
    } finally {
        // Liberar conexión siempre
        if (connection) {
            connection.release();
        }
    }
};