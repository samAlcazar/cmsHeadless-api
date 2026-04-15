// src/modules/content/content.validator.js

import { z } from 'zod'

export const buildSchemaFromFields = (fields) => {
  const shape = {}

  for (const field of fields) {
    let validator

    switch (field.field_type) {
      case 'string':
        validator = z.string()
        break

      case 'text':
      case 'richtext':
        validator = z.string()
        break

      case 'number':
        validator = z.number()
        break

      case 'boolean':
        validator = z.boolean()
        break

      case 'date':
        validator = z.string() // luego puedes refinar
        break

      case 'image':
      case 'relation':
        validator = z.string()
        break

      default:
        validator = z.any()
    }

    // ENUM / SELECT (options)
    if (field.options?.values) {
      validator = z.enum(field.options.values)
    }

    // ARRAY
    if (field.is_list) {
      validator = z.array(validator)
    }

    // REQUIRED / OPTIONAL
    if (!field.is_required) {
      validator = validator.optional()
    }

    // DEFAULT VALUE
    if (field.default_value !== null && field.default_value !== undefined) {
      validator = validator.default(field.default_value)
    }

    shape[field.name] = validator
  }

  return z.object(shape)
}
