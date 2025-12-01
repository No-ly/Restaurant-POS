import express from 'express';
import { getReporteHoy, getReporteRango } from '../controllers/reportes.controller.js';

const router = express.Router();

router.get('/hoy', getReporteHoy);
router.get('/rango', getReporteRango);

export default router;