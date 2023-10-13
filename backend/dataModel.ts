export interface Location {
  id: string;
  name: string;
  address: string;
  cars: string[];
}
export interface Car {
  id: string;
  brand: string;
  model: string;
  pricePerDay: number;
  numberOfSeats: number;
  isAutomatic: boolean;
  isElectric: boolean;
  picture: string;
}
export interface Reservation {
  id: string;
  start: Date;
  end: Date;
  carId: string;
  locationId: string;
  usedId: string;
}
