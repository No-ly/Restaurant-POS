import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import categoriasRoutes from './routes/categorias.routes.js';
import productosRoutes from './routes/productos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import ingredientesRoutes from './routes/ingredientes.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar conexión a BD
app.get('/ping', async (req, res) => {
    try {
        const [results] = await pool.execute('SELECT 1 + 1 AS result');
        res.json({
            message: '✅ Servidor y base de datos funcionando correctamente',
            databaseResult: results[0].result
        });
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
        res.status(500).json({
            error: 'Error de conexión a la base de datos',
            details: error.message
        });
    }
});

// Rutas de la API
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ingredientes', ingredientesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
});