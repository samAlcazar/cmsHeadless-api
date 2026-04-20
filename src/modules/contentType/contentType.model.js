// src/modules/contentType/contentType.model.js

import { pool } from '../../config/db.js'

// Crear
export const createContentType = async ({
  name,
  displayName,
  description,
  isSingle
}) => {
  const { rows } = await pool.query(
    `
    INSERT INTO content_types (name, display_name, description, is_single)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, displayName, description, isSingle]
  )

  return rows[0]
}

// Obtener todos
export const getContentTypes = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM content_types ORDER BY created_at DESC'
  )

  return rows
}

// Obtener uno por id
export const getContentTypeById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM content_types WHERE id = $1 LIMIT 1',
    [id]
  )

  return rows[0]
}

// Eliminar
export const deleteContentType = async (id) => {
  await pool.query(
    'DELETE FROM content_types WHERE id = $1',
    [id]
  )
}
