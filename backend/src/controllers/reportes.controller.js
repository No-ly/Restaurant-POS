import pool from '../db.js';

// GET /api/reportes/hoy - Obtener reporte del día actual
export const getReporteHoy = async (req, res) => {
    try {
        // 1. Obtener estadísticas del día
        const [estadisticas] = await pool.execute(`
            SELECT 
                COALESCE(SUM(total), 0) as totalVentas,
                COUNT(*) as cantidadPedidos,
                CASE 
                    WHEN COUNT(*) > 0 THEN COALESCE(SUM(total) / COUNT(*), 0)
                    ELSE 0 
                END as ticketPromedio
            FROM pedidos 
            WHERE DATE(fecha) = CURDATE()
        `);

        // 2. Obtener últimas 5 ventas del día
        const [ultimasVentas] = await pool.execute(`
            SELECT 
                p.id,
                p.mesa,
                p.total,
                p.fecha,
                u.nombre as mesero_nombre
            FROM pedidos p
            LEFT JOIN usuarios u ON p.id_usuario = u.id
            WHERE DATE(p.fecha) = CURDATE()
            ORDER BY p.fecha DESC
            LIMIT 5
        `);

        // Formatear respuesta
        const reporte = {
            totalVentas: parseFloat(estadisticas[0]?.totalVentas || 0),
            cantidadPedidos: parseInt(estadisticas[0]?.cantidadPedidos || 0),
            ticketPromedio: parseFloat(estadisticas[0]?.ticketPromedio || 0),
            ultimasVentas: ultimasVentas.map(venta => ({
                id: venta.id,
                mesa: venta.mesa,
                total: parseFloat(venta.total),
                fecha: venta.fecha,
                fecha_formateada: new Date(venta.fecha).toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                mesero: venta.mesero_nombre || 'No asignado'
            }))
        };

        console.log('📊 Reporte del día generado:', reporte);
        res.json(reporte);

    } catch (error) {
        console.error('Error generando reporte:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor al generar reporte',
            details: error.message 
        });
    }
};

// GET /api/reportes/rango - Para futuras expansiones (reportes por fecha)
export const getReporteRango = async (req, res) => {
    try {
        const { inicio, fin } = req.query;
        
        // Validar fechas
        if (!inicio || !fin) {
            return res.status(400).json({ error: 'Las fechas inicio y fin son requeridas' });
        }

        const [estadisticas] = await pool.execute(`
            SELECT 
                COALESCE(SUM(total), 0) as totalVentas,
                COUNT(*) as cantidadPedidos,
                CASE 
                    WHEN COUNT(*) > 0 THEN COALESCE(SUM(total) / COUNT(*), 0)
                    ELSE 0 
                END as ticketPromedio
            FROM pedidos 
            WHERE DATE(fecha) BETWEEN ? AND ?
        `, [inicio, fin]);

        res.json({
            totalVentas: parseFloat(estadisticas[0]?.totalVentas || 0),
            cantidadPedidos: parseInt(estadisticas[0]?.cantidadPedidos || 0),
            ticketPromedio: parseFloat(estadisticas[0]?.ticketPromedio || 0),
            periodo: { inicio, fin }
        });

    } catch (error) {
        console.error('Error generando reporte por rango:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
};