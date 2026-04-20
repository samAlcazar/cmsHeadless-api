// src/app.js

import express from 'express'
import contentRoutes from './modules/content/content.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'
import contentTypeRoutes from './modules/contentType/contentType.routes.js'
import fieldRoutes from './modules/field/field.routes.js'

const app = express()

app.use(express.json())

app.use('/api/content-types', contentTypeRoutes)
app.use('/api/fields', fieldRoutes)
app.use('/api', contentRoutes)

app.use(errorHandler)

export default app
