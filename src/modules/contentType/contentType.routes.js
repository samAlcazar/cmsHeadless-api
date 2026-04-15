// src/modules/contentType/contentType.routes.js

import { Router } from 'express'
import * as contentTypeController from './contentType.controller.js'

const router = Router()

router.post('/', contentTypeController.createContentType)
router.get('/', contentTypeController.getContentTypes)
router.get('/:id', contentTypeController.getContentType)
router.delete('/:id', contentTypeController.deleteContentType)

export default router
