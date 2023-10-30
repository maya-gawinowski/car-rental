interface IUser {
  id: string
  name: string
  email: string
  password: string
  readonly reservations: string[]
}

export default IUser
