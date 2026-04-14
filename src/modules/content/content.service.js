// src/modules/content/content.service.js

import * as contentModel from './content.model.js'
import { buildSchemaFromFields } from './content.validator.js'
import { slugify } from '../../utils/slugify.js'

export const createEntry = async (contentTypeName, payload) => {
  // 1. obtener content type
  const contentType = await contentModel.getContentTypeByName(contentTypeName)

  if (!contentType) {
    throw new Error(`Content type '${contentTypeName}' no existe`)
  }

  // 2. obtener fields
  const fields = await contentModel.getFieldsByContentType(contentType.id)

  // 3. construir schema dinámico
  const schema = buildSchemaFromFields(fields)

  // 4. validar con Zod
  const validatedData = schema.parse(payload)

  // 5. generar slug (si existe title)
  let slug = null

  if (validatedData.title) {
    slug = slugify(validatedData.title)
  }

  // 6. insertar en DB
  const entry = await contentModel.createEntry({
    contentTypeId: contentType.id,
    data: validatedData,
    slug,
    status: validatedData.status || 'draft'
  })

  return entry
}

export const getEntries = async (contentTypeName, query) => {
  const contentType = await contentModel.getContentTypeByName(contentTypeName)

  if (!contentType) {
    throw new Error(`Content type '${contentTypeName}' no existe`)
  }

  const entries = await contentModel.getEntries(contentType.id, query)

  // flatten JSONB
  return entries.map(entry => ({
    id: entry.id,
    slug: entry.slug,
    status: entry.status,
    ...entry.data
  }))
}

export const getEntry = async (contentTypeName, id) => {
  const contentType = await contentModel.getContentTypeByName(contentTypeName)

  if (!contentType) {
    throw new Error(`Content type '${contentTypeName}' no existe`)
  }

  const entry = await contentModel.getEntryById(contentType.id, id)

  if (!entry) {
    throw new Error('Entry no encontrada')
  }

  return {
    id: entry.id,
    slug: entry.slug,
    status: entry.status,
    ...entry.data
  }
}

export const updateEntry = async (contentTypeName, id, payload) => {
  const contentType = await contentModel.getContentTypeByName(contentTypeName)

  if (!contentType) {
    throw new Error(`Content type '${contentTypeName}' no existe`)
  }

  const fields = await contentModel.getFieldsByContentType(contentType.id)

  const schema = buildSchemaFromFields(fields).partial()

  const validatedData = schema.parse(payload)

  let slug = null
  if (validatedData.title) {
    slug = slugify(validatedData.title)
  }

  const updated = await contentModel.updateEntry({
    id,
    contentTypeId: contentType.id,
    data: validatedData,
    slug
  })

  return updated
}

export const deleteEntry = async (contentTypeName, id) => {
  const contentType = await contentModel.getContentTypeByName(contentTypeName)

  if (!contentType) {
    throw new Error(`Content type '${contentTypeName}' no existe`)
  }

  await contentModel.softDeleteEntry(id, contentType.id)

  return true
}
