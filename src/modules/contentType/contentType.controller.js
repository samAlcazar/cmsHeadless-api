// src/modules/contentType/contentType.controller.js

import * as contentTypeService from './contentType.service.js'

// Crear
export const createContentType = async (req, res, next) => {
  try {
    const result = await contentTypeService.createContentType(req.body)

    res.status(201).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err)
  }
}

// Obtener todos
export const getContentTypes = async (req, res, next) => {
  try {
    const result = await contentTypeService.getContentTypes()

    res.json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err)
  }
}

// Obtener uno
export const getContentType = async (req, res, next) => {
  try {
    const result = await contentTypeService.getContentType(req.params.id)

    res.json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err)
  }
}

// Eliminar
export const deleteContentType = async (req, res, next) => {
  try {
    await contentTypeService.deleteContentType(req.params.id)

    res.json({
      success: true,
      message: 'Eliminado correctamente'
    })
  } catch (err) {
    next(err)
  }
}
