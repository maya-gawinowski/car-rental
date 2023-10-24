import express, { Express, Request, Response } from 'express';
import { cars } from '../data/cars';
import { Odense, Aarhus, Copenhagen, Roskilde } from '../data/locations';
import { Location, Reservation } from '../dataModel';

const morgan = require('morgan');
const app: Express = express();
const PORT: number = 3000;

const locations: Location[] = [Odense, Aarhus, Copenhagen, Roskilde];
const dummyReservation1: Reservation = {
  id: '1',
  start: new Date('2023-10-15'),
  end: new Date('2023-10-20'),
  carId: '123',
  locationId: '123',
  userId: '123',
};
const dummyReservation2: Reservation = {
  id: '2',
  start: new Date('2023-10-14'),
  end: new Date('2023-10-21'),
  carId: '124',
  locationId: '121',
  userId: '177',
};
const reservations: Reservation[] = [dummyReservation1, dummyReservation2];
// default logging
app.use(morgan('combined'));
// json body parser
app.use(express.json());

app.get('/cars', (req: Request, res: Response) => {
  let searchResult = cars;
  const locationQuery = req.query.location;
  const seatsQuery = req.query.seats;
  if (locationQuery != null) {
    const location = locations.find(
      l => l.name.toLowerCase() === locationQuery.toString().toLowerCase()
    );
    if (location) {
      searchResult = searchResult.filter(car => location.cars.includes(car.id));
    } else {
      res.status(404).send('Location not found');
    }
  }
  if (seatsQuery != null) {
    const numberOfSeats = parseInt(seatsQuery.toString());
    searchResult = searchResult.filter(
      car => car.numberOfSeats == numberOfSeats
    );
  }
  res.json(searchResult);
});
app.get('/locations', (req: Request, res: Response) => {
  res.json(locations);
});
app.get('/cars/:carId', (req: Request, res: Response) => {
  const carId = req.params.carId;
  const car = cars.find(c => c.id === carId);
  if (car) {
    res.json(car);
  } else {
    res.status(404).send('Car not found');
  }
});

app.get('/reservations', (req: Request, res: Response) => {
  const userId = req.query.userId;
  let result = reservations;
  if (userId != null) {
    result = reservations.filter(
      (item: Reservation) => item.userId == userId.toString()
    );
  }
  res.json(result);
});

app.post('/reservations', (req: Request, res: Response) => {
  const reservation = req.body;
  // real application should be uuid
  reservation.id = (reservations.length + 1).toString();
  reservations.push(reservation);
  res.status(201).json(reservation);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
