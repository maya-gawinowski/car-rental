import mongoose from 'mongoose'
import { DataType } from '../interfaces/dataType'

declare module 'express-serve-static-core' {
  interface User {
    id: string
    name: string
    email: string
    password: string
    reservations: string[]
  }

  export interface Request {
    user?: User
  }
}
