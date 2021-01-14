import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import routes from './routes'
import AppError from './errors/AppError'
import './database'

const app = express()

app.use(express.json())
app.use(cors)
app.use(routes)
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: `Error ${err.statusCode}`,
        message: err.message,
      })
    }
    console.log(err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
)

export default app
