// src/modules/field/field.service.js

import * as fieldModel from './field.model.js'

const ALLOWED_FIELD_TYPES = [
  'string',
  'text',
  'richtext',
  'number',
  'boolean',
  'date',
  'image',
  'relation'
]

export const createField = async (data) => {
  if (!data.contentTypeId) {
    throw new Error('contentTypeId es requerido')
  }

  if (!data.name) {
    throw new Error('name es requerido')
  }

  if (!data.fieldType) {
    throw new Error('fieldType es requerido')
  }

  if (!ALLOWED_FIELD_TYPES.includes(data.fieldType)) {
    throw new Error(`fieldType inválido: ${data.fieldType}`)
  }

  if (data.fieldType === 'relation' && !data.relationContentTypeId) {
    throw new Error('relationContentTypeId es requerido para fields de tipo relation')
  }

  return await fieldModel.createField({
    contentTypeId: data.contentTypeId,
    name: data.name,
    displayName: data.displayName || data.name,
    fieldType: data.fieldType,
    isRequired: data.isRequired ?? false,
    isList: data.isList ?? false,
    defaultValue: data.defaultValue ?? null,
    options: data.options ?? null,
    relationContentTypeId: data.relationContentTypeId ?? null,
    position: data.position ?? 0
  })
}

export const getFieldsByContentType = async (contentTypeId) => {
  if (!contentTypeId) {
    throw new Error('contentTypeId es requerido')
  }

  return await fieldModel.getFieldsByContentType(contentTypeId)
}

export const getField = async (id) => {
  const field = await fieldModel.getFieldById(id)

  if (!field) {
    throw new Error('Field no encontrado')
  }

  return field
}

export const updateField = async (id, data) => {
  if (data.fieldType && !ALLOWED_FIELD_TYPES.includes(data.fieldType)) {
    throw new Error(`fieldType inválido: ${data.fieldType}`)
  }

  if (data.fieldType === 'relation' && !data.relationContentTypeId) {
    throw new Error('relationContentTypeId es requerido para fields de tipo relation')
  }

  const updated = await fieldModel.updateField({
    id,
    name: data.name,
    displayName: data.displayName,
    fieldType: data.fieldType,
    isRequired: data.isRequired,
    isList: data.isList,
    defaultValue: data.defaultValue,
    options: data.options,
    relationContentTypeId: data.relationContentTypeId,
    position: data.position
  })

  if (!updated) {
    throw new Error('Field no encontrado')
  }

  return updated
}

export const deleteField = async (id) => {
  const field = await fieldModel.getFieldById(id)

  if (!field) {
    throw new Error('Field no encontrado')
  }

  await fieldModel.deleteField(id)
}
