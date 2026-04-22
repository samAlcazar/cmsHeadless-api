// src/modules/field/field.routes.js

import { Router } from 'express'
import * as fieldController from './field.contoller.js'

const router = Router()

router.post('/', fieldController.createField)
router.get('/content-type/:contentTypeId', fieldController.getFieldsByContentType)
router.get('/:id', fieldController.getField)
router.patch('/:id', fieldController.updateField)
router.delete('/:id', fieldController.deleteField)

export default router
