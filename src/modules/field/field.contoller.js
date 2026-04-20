// src/modules/field/field.controller.js

import * as fieldService from './field.service.js'

export const createField = async (req, res, next) => {
  try {
    const result = await fieldService.createField(req.body)

    return res.status(201).json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const getFieldsByContentType = async (req, res, next) => {
  try {
    const { contentTypeId } = req.params
    const result = await fieldService.getFieldsByContentType(contentTypeId)

    return res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const getField = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await fieldService.getField(id)

    return res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const updateField = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await fieldService.updateField(id, req.body)

    return res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const deleteField = async (req, res, next) => {
  try {
    const { id } = req.params
    await fieldService.deleteField(id)

    return res.json({
      success: true,
      message: 'Field eliminado correctamente'
    })
  } catch (error) {
    next(error)
  }
}
