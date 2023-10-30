// Don't remove this import. The code will break otherwise.
import { Request } from 'express'

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
