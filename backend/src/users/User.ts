import Database from '../database/Database'
import ErrorMessages from '../models/ErrorMessages'
import IUser from '../models/IUser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


    
class User {
  private readonly data: IUser

  // This is highly insecure, but it's just for the sake of the example.
  // You should never store your secrets in your code.
  public static readonly JWT_SECRET = 'secret'

  constructor(data: IUser) {
    this.data = data
  }

  public get id() {
    return this.data.id
  }

  public get name() {
    return this.data.name
  }

  public get email() {
    return this.data.email
  }

  public get reservations() {
    return this.data.reservations
  }

  public get forApi() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      reservations: this.reservations,
    }
  }

  public static async addUser(data: IUser) {
    const password = await bcrypt.hash(data.password, 10)
    const savedUserData = Database.instance.createNew('users', {
      ...data,
      password,
    })
    return new User(savedUserData)
  }

  public static getUser(email: string) {
    const userData = Database.instance.getByAttribute('users', { email })
    if (userData) {
      return new User(userData)
    }
    return null
  }

  /**
   * Checks if the password is correct and returns a valid JWT token
   * @param password The password entered by the user
   * @returns A valid JWT token if the password is correct
   */
  public async login(password: string) {
    const isPasswordCorrect = await bcrypt.compare(password, this.data.password)

    if (!isPasswordCorrect) {
      throw new Error(ErrorMessages.INVALID_PASSWORD)
    }

    return this.validToken()
  }

  public getReservations() {
    return Database.instance.getAll('reservations', { userId: this.id })
  }

  private validToken() {
    const payload = {
      id: this.id,
      name: this.name,
      email: this.email,
    }

    const token = jwt.sign(payload, User.JWT_SECRET, {
      expiresIn: '1h',
    })

    return token
  }
}

export default User
