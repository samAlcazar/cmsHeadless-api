# 🧠 Headless CMS API

API REST para gestión dinámica de contenido usando PostgreSQL + Node.js.

Permite crear:
- Tipos de contenido (content-types)
- Campos dinámicos (fields)
- Entradas de contenido (entries)

---

# 🚀 Base URL

http://localhost:3000/api

---

# 📦 Estructura general

| Recurso        | Endpoint base           |
|----------------|------------------------|
| Content Types  | /content-types         |
| Fields         | /fields                |
| Content (data) | /:contentType          |

---

# 🧩 1. Content Types

Definen los modelos (ej: posts, products, categories)

## ➕ Crear content type
POST /content-types

{
  "name": "posts",
  "displayName": "Posts",
  "description": "Blog posts",
  "isSingle": false
}

## 📄 Obtener todos
GET /content-types

## 🔍 Obtener uno
GET /content-types/:id

## ❌ Eliminar
DELETE /content-types/:id

---

# 🧩 2. Fields

Definen la estructura de cada contentType

## ➕ Crear field
POST /fields

{
  "contentTypeId": "UUID",
  "name": "title",
  "displayName": "Título",
  "fieldType": "string",
  "isRequired": true,
  "position": 1
}

## 📄 Obtener fields por content type
GET /fields/content-type/:contentTypeId

## 🔍 Obtener uno
GET /fields/:id

## ✏️ Actualizar
PATCH /fields/:id

## ❌ Eliminar
DELETE /fields/:id

## 🧠 Tipos de campos soportados
- string
- text
- richtext
- number
- boolean
- date
- image
- relation

---

# 🧩 3. Content (Entries)

Contenido dinámico basado en contentType

## ➕ Crear entry
POST /:contentType

Ejemplo:
POST /posts

{
  "title": "Hola mundo",
  "content": "Mi primer post"
}

## 📄 Obtener todos
GET /:contentType

## 🔍 Obtener uno
GET /:contentType/:id

## ✏️ Actualizar (parcial)
PATCH /:contentType/:id

{
  "title": "Nuevo título"
}

## ❌ Eliminar (soft delete)
DELETE /:contentType/:id

---

# 🔎 Filtros dinámicos

GET /posts?title=hola
GET /posts?status=published

---

# 🧠 Flujo básico

1. Crear content type
2. Crear fields
3. Crear contenido
4. Consultar contenido

---

# 🚀 Ejemplo con curl

curl -X POST http://localhost:3000/api/posts \
-H "Content-Type: application/json" \
-d '{"title":"Hola","content":"Texto"}'

---

# 🎯 Conclusión

Este sistema permite construir un CMS completamente dinámico sin definir modelos en código.

🔥 Todo se define en la base de datos.
