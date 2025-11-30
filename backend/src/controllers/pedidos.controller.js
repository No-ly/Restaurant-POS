import pool from '../db.js';

// GET /api/pedidos/pendientes - Obtener pedidos pendientes para cocina
export const getPedidosPendientes = async (req, res) => {
    try {
        const [pedidos] = await pool.execute(`
            SELECT 
                p.id,
                p.mesa,
                p.fecha,
                p.total,
                p.estado,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id_producto', dp.id_producto,
                        'nombre_producto', pr.nombre,
                        'cantidad', dp.cantidad,
                        'especificaciones', dp.especificaciones,
                        'estado_preparacion', dp.estado_preparacion
                    )
                ) as items
            FROM pedidos p
            INNER JOIN detalle_pedido dp ON p.id = dp.id_pedido
            INNER JOIN productos pr ON dp.id_producto = pr.id
            WHERE p.estado = 'Pendiente'
            GROUP BY p.id, p.mesa, p.fecha, p.total, p.estado
            ORDER BY p.fecha ASC
        `);

        // Transformar los datos para el frontend
        const pedidosFormateados = pedidos.map(pedido => ({
            ...pedido,
            items: pedido.items || [],
            fecha_formateada: new Date(pedido.fecha).toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit'
            })
        }));

        res.json(pedidosFormateados);

    } catch (error) {
        console.error('Error obteniendo pedidos pendientes:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
};

// PUT /api/pedidos/:id/completar - Marcar pedido como completado
export const completarPedido = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Actualizar estado del pedido
        await connection.execute(
            'UPDATE pedidos SET estado = ? WHERE id = ?',
            ['Completado', id]
        );

        // Actualizar estado de preparación de los items
        await connection.execute(
            'UPDATE detalle_pedido SET estado_preparacion = ? WHERE id_pedido = ?',
            ['Completado', id]
        );

        await connection.commit();

        res.json({ 
            message: 'Pedido marcado como completado',
            id_pedido: parseInt(id)
        });

    } catch (error) {
        if (connection) await connection.rollback();
        
        console.error('Error completando pedido:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    } finally {
        if (connection) connection.release();
    }
};


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

