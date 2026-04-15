// src/app.js

import express from 'express'
import contentRoutes from './modules/content/content.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

app.use(express.json())

app.use('/api', contentRoutes)

app.use(errorHandler)

export default app
