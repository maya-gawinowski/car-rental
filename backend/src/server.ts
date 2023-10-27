import express, { Express, Request, Response } from 'express'
import { cars } from '../data/cars'
import { Odense, Aarhus, Copenhagen, Roskilde } from '../data/locations'
import IReservation from './models/IReservation'
import ILocation from './models/ILocation'
import morgan from 'morgan'
import User from './users/User'
import ErrorMessages from './models/ErrorMessages'
import { authenticate } from './user-authentication/Authenticate'
import passportConfig from './user-authentication/Passport'
import Database from './database/Database'

const app: Express = express()
const PORT: number = 3000

const dummyReservation1: IReservation = {
  id: '1',
  start: new Date('2023-10-15'),
  end: new Date('2023-10-20'),
  carId: '12',
  locationId: '123',
  userId: '123',
}
const dummyReservation2: IReservation = {
  id: '2',
  start: new Date('2023-10-14'),
  end: new Date('2023-10-21'),
  carId: '124',
  locationId: '121',
  userId: '177',
}
const reservations: IReservation[] = [dummyReservation1, dummyReservation2]
passportConfig.initialiseJWTStrategy()
// default logging
app.use(morgan('combined'))
// json body parser
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Car Rental API')
})

app.get('/cars', (req: Request, res: Response) => {
  const locations = Database.instance.getAll('locations', {})
  let searchResult = cars
  const locationQuery = req.query.location
  const seatsQuery = req.query.seats
  if (locationQuery != null) {
    const location = locations.find(
      (l) => l.name.toLowerCase() === locationQuery.toString().toLowerCase()
    )
    if (location) {
      searchResult = searchResult.filter((car) =>
        location.cars.includes(car.id)
      )
    } else {
      res.status(404).send('Location not found')
    }
  }
  if (seatsQuery != null) {
    const numberOfSeats = parseInt(seatsQuery.toString())
    searchResult = searchResult.filter(
      (car) => car.numberOfSeats == numberOfSeats
    )
  }
  res.json(searchResult)
})

app.get('/locations', (req: Request, res: Response) => {
  res.json(Database.instance.getAll('locations', {}))
})

app.get('/cars/:carId', (req: Request, res: Response) => {
  const carId = req.params.carId
  const car = Database.instance.getByAttribute('cars', { id: carId })
  if (car) {
    res.json(car)
  } else {
    res.status(404).send('Car not found')
  }
})

app.get('/reservations', authenticate, (req: Request, res: Response) => {
  const user = new User(req.user!)
  const reservations = user.getReservations()
  res.json({ reservations })
})

app.post('/reservations', authenticate, (req: Request, res: Response) => {
  const reservationData = req.body
  if (
    !reservationData.start ||
    !reservationData.end ||
    !reservationData.carId ||
    !reservationData.locationId
  ) {
    return res.status(400).send('Missing start, end, carId or locationId')
  }
  const reservation = Database.instance.createNew('reservations', {
    ...reservationData,
    userId: req.user!.id,
  })
  res.status(201).json(reservation)
})

app.post('/users', async (req: Request, res: Response) => {
  const userData = req.body
  if (!userData.name || !userData.email || !userData.password) {
    res.status(400).send('Missing name, email or password')
    return
  }
  try {
    const user = await User.addUser(userData)
    res.status(201).json(user.forApi)
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
})

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = User.getUser(email)
  try {
    if (!user) {
      throw new Error(ErrorMessages.INVALID_PASSWORD)
    }
    const token = await user.login(password)
    res.json({ token })
  } catch (error) {
    if ((error as Error).message === ErrorMessages.INVALID_PASSWORD) {
      res.status(401).send('Wrong email or password')
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
