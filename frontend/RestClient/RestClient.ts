import { Platform } from 'react-native';
import axios from 'axios';
import ICar from '../../backend/src/models/ICar';
import ILocation from '../../backend/src/models/ILocation';
import IReservation from '../../backend/src/models/IReservation';
import IUser from '../../backend/src/models/IUser';

export interface CarCriteria {
  locationName?: string;
  seats?: number;
}

export class RestClient {
  private host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  private static instance: RestClient;
  private token?: string;

  private constructor() {}

  public static getInstance(): RestClient {
    if (!RestClient.instance) {
      RestClient.instance = new RestClient();
    }
    return RestClient.instance;
  }

  public async searchCars(criteria: CarCriteria): Promise<ICar[]> {
    const url = `http://${this.host}:3000/cars`;
    const response = await axios.get(url, { params: criteria });
    return response.data;
  }

  public async getCar(carId: string): Promise<ICar> {
    const url = `http://${this.host}:3000/cars/${carId}`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getLocations(): Promise<ILocation[]> {
    const url = `http://${this.host}:3000/locations`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getReservations(): Promise<IReservation[]> {
    const url = `http://${this.host}:3000/reservations`;
    const response = await axios.get(url);
    return response.data;
  }
  public async getReservationsByUser(userId: string): Promise<IReservation[]> {
    const url = `http://${this.host}:3000/reservations`;
    const response = await axios.get(url, { params: { userId } });
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
    const reservation: IReservation = {
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

  public async createUser(name: string, email: string, password: string) : Promise<IUser> {
    const url = `http://${this.host}:3000/users`;
    const response = await axios.post(url, {name, email, password});
    return response.data;
  }

  public async login(email: string, password: string) : Promise<void> {
    const url = `http://${this.host}:3000/login`;
    const response = await axios.post(url, {email, password});
    if (response.status === 401) {
      throw new Error("Login error : user unauthorised")
    } 
    this.token = response.data.token;
  }
 }
