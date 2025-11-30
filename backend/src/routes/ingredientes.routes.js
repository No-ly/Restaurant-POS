import express from 'express';
import { getIngredientes } from '../controllers/ingredientes.controller.js';

const router = express.Router();

router.get('/', getIngredientes);

export default router;