import { Platform } from 'react-native';
import axios from 'axios';
import { Location, Car, Reservation } from '../../backend/dataModel';

export interface CarCriteria {
  locationName?: string;
  seats?: number;
}

export class RestClient {
  private host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  private static instance: RestClient;

  private constructor() {}

  public static getInstance(): RestClient {
    if (!RestClient.instance) {
      RestClient.instance = new RestClient();
    }
    return RestClient.instance;
  }

  public async searchCars(criteria: CarCriteria): Promise<Car[]> {
    const url = `http://${this.host}:3000/cars`;
    const response = await axios.get(url, { params: criteria });
    return response.data;
  }

  public async getCar(carId: string): Promise<Car> {
    const url = `http://${this.host}:3000/cars/${carId}`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getLocations(): Promise<Location[]> {
    const url = `http://${this.host}:3000/locations`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getReservations(): Promise<Reservation[]> {
    const url = `http://${this.host}:3000/reservations`;
    const response = await axios.get(url);
    return response.data;
  }

  public async postReservation(
    carId: string,
    userId: string,
    locationId: string,
    start: Date,
    end: Date
  ): Promise<void> {
    const url = `http://${this.host}:3000/reservations`;
    const reservation: Reservation = {
      id: '',
      start: start,
      end: end,
      carId: carId,
      userId: userId,
      locationId: locationId,
    };
    console.log(reservation);
    const response = await axios.post(url, reservation);
    return response.data;
  }
}
