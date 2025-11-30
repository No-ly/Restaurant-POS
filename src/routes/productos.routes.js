import express from 'express';
import { getProductos, createProducto } from '../controllers/productos.controller.js';

const router = express.Router();

router.get('/', getProductos);
router.post('/', createProducto);

export default router;