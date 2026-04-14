// src/modules/content/content.controller.js

import * as contentService from './content.service.js'

// POST /api/:contentType
export const createEntry = async (req, res, next) => {
  try {
    const { contentType } = req.params
    const data = req.body

    const result = await contentService.createEntry(contentType, data)

    return res.status(201).json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

// GET /api/:contentType
export const getEntries = async (req, res, next) => {
  try {
    const { contentType } = req.params
    const query = req.query

    const result = await contentService.getEntries(contentType, query)

    return res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

// GET /api/:contentType/:id
export const getEntry = async (req, res, next) => {
  try {
    const { contentType, id } = req.params

    const result = await contentService.getEntry(contentType, id)

    return res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

// PUT /api/:contentType/:id
export const updateEntry = async (req, res, next) => {
  try {
    const { contentType, id } = req.params
    const data = req.body

    const result = await contentService.updateEntry(contentType, id, data)

    return res.json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/:contentType/:id
export const deleteEntry = async (req, res, next) => {
  try {
    const { contentType, id } = req.params

    await contentService.deleteEntry(contentType, id)

    return res.json({
      success: true,
      message: 'Entry eliminada correctamente'
    })
  } catch (error) {
    next(error)
  }
}
