export interface CarItem {
  id: string;
  brand: string;
  model: string;
  pricePerDay: number;
  numberOfSeats: number;
  isAutomatic: boolean;
  isElectric: boolean;
  picture: string;
}

export interface CarCriteria {
  locationName: string;
  numberOfSeats: number;
}

export interface Location {
  id: number
  name: string
}