import { NextFunction, Response, Request } from 'express'
import passport from 'passport'
import IUser from '../models/IUser'

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: IUser) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      req.user = user
      next()
    }
  )(req, res, next)
}
