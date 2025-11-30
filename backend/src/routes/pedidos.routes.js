import express from 'express';
import { createPedido,getPedidosPendientes, completarPedido  } from '../controllers/pedidos.controller.js';

const router = express.Router();

router.post('/', createPedido);
router.get('/pendientes', getPedidosPendientes);
router.put('/:id/completar', completarPedido);

export default router;