// src/modules/content/content.routes.js

import { Router } from 'express'
import * as contentController from './content.controller.js'

const router = Router()

// 🔥 CRUD dinámico

// Crear
router.post('/:contentType', contentController.createEntry)

// Obtener lista
router.get('/:contentType', contentController.getEntries)

// Obtener uno
router.get('/:contentType/:id', contentController.getEntry)

// Actualizar (tipo PATCH)
router.patch('/:contentType/:id', contentController.updateEntry)

// Eliminar (soft delete)
router.delete('/:contentType/:id', contentController.deleteEntry)

export default router
