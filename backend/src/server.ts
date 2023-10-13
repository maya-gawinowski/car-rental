import express, { Express, Request, Response } from 'express';
import { cars } from '../data/cars';
import { Odense, Aarhus, Copenhagen, Roskilde } from '../data/locations';
import { Location, Reservation } from '../dataModel';

const morgan = require('morgan');
const app: Express = express();
const PORT: number = 3000;

const locations: Location[] = [Odense, Aarhus, Copenhagen, Roskilde];
const reservations: Reservation[] = [];
// default logging
app.use(morgan());

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
  res.json(reservations);
});

app.post('/reservations', (req: Request, res: Response) => {
  const newReservation = req.body;
  // real application should be uuid
  newReservation.id = reservations.length + 1;
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
