import { Strategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import User from '../users/User'

class Passport {
  public initialiseJWTStrategy() {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: User.JWT_SECRET,
    }

    passport.use(
      new Strategy(options, async (payload, done) => {
        try {
          return done(null, payload)
        } catch (error) {
          return done(error)
        }
      })
    )
  }
}

export default new Passport()
