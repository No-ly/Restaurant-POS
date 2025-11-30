import express from 'express';
import { 
  getProductos, 
  createProducto, 
  getProductIngredients  // ← AGREGAR ESTA IMPORTACIÓN
} from '../controllers/productos.controller.js';

const router = express.Router();

router.get('/', getProductos);
router.post('/', createProducto);
router.get('/:id/ingredientes', getProductIngredients); // ← Ahora está definido

export default router;