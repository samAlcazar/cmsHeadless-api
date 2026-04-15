// src/modules/contentType/contentType.service.js

import * as contentTypeModel from './contentType.model.js'

export const createContentType = async (data) => {
  if (!data.name) {
    throw new Error('El nombre es requerido')
  }

  return await contentTypeModel.createContentType({
    name: data.name,
    displayName: data.displayName || data.name,
    description: data.description || null,
    isSingle: data.isSingle || false
  })
}

export const getContentTypes = async () => {
  return await contentTypeModel.getContentTypes()
}

export const getContentType = async (id) => {
  const ct = await contentTypeModel.getContentTypeById(id)

  if (!ct) {
    throw new Error('Content type no encontrado')
  }

  return ct
}

export const deleteContentType = async (id) => {
  return await contentTypeModel.deleteContentType(id)
}
