import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

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

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
});