// src/utils/slugify.js

export const slugify = (text) => {
  if (!text) return null

  return text
    .toString()
    .toLowerCase()
    .trim()
    // quitar acentos
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // reemplazar espacios por guiones
    .replace(/\s+/g, '-')
    // quitar caracteres inválidos
    .replace(/[^\w-]+/g, '')
    // evitar múltiples guiones
    .replace(/--+/g, '-')
}
