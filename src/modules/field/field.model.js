// src/modules/field/field.model.js

import { pool } from '../../config/db.js'

export const createField = async ({
  contentTypeId,
  name,
  displayName,
  fieldType,
  isRequired,
  isList,
  defaultValue,
  options,
  relationContentTypeId,
  position
}) => {
  const { rows } = await pool.query(
    `
    INSERT INTO fields (
      content_type_id,
      name,
      display_name,
      field_type,
      is_required,
      is_list,
      default_value,
      options,
      relation_content_type_id,
      position
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `,
    [
      contentTypeId,
      name,
      displayName,
      fieldType,
      isRequired,
      isList,
      defaultValue,
      options,
      relationContentTypeId,
      position
    ]
  )

  return rows[0]
}

export const getFieldsByContentType = async (contentTypeId) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM fields
    WHERE content_type_id = $1
    ORDER BY position ASC, created_at ASC
    `,
    [contentTypeId]
  )

  return rows
}

export const getFieldById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM fields
    WHERE id = $1
    LIMIT 1
    `,
    [id]
  )

  return rows[0]
}

export const deleteField = async (id) => {
  await pool.query(
    `
    DELETE FROM fields
    WHERE id = $1
    `,
    [id]
  )
}

export const updateField = async ({
  id,
  name,
  displayName,
  fieldType,
  isRequired,
  isList,
  defaultValue,
  options,
  relationContentTypeId,
  position
}) => {
  const { rows } = await pool.query(
    `
    UPDATE fields
    SET
      name = COALESCE($1, name),
      display_name = COALESCE($2, display_name),
      field_type = COALESCE($3, field_type),
      is_required = COALESCE($4, is_required),
      is_list = COALESCE($5, is_list),
      default_value = COALESCE($6, default_value),
      options = COALESCE($7, options),
      relation_content_type_id = COALESCE($8, relation_content_type_id),
      position = COALESCE($9, position),
      updated_at = NOW()
    WHERE id = $10
    RETURNING *
    `,
    [
      name,
      displayName,
      fieldType,
      isRequired,
      isList,
      defaultValue,
      options,
      relationContentTypeId,
      position,
      id
    ]
  )

  return rows[0]
}
