import express from 'express';
import { getUsuarios } from '../controllers/usuarios.controller.js';

const router = express.Router();

router.get('/', getUsuarios);

export default router;