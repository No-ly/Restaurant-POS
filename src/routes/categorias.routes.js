import express from 'express';
import { getCategorias, createCategoria } from '../controllers/categorias.controller.js';

const router = express.Router();

router.get('/', getCategorias);
router.post('/', createCategoria);

export default router;