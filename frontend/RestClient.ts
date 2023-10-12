import {Platform} from "react-native";
import axios from "axios";
import {CarCriteria, CarItem, Location} from "./model";

export class RestClient {

  private host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  private static instance: RestClient;

  private constructor() {
  }

  public static getInstance(): RestClient {
    if (!RestClient.instance) {
      RestClient.instance = new RestClient();
    }
    return RestClient.instance;
  }

  public async searchCars(criteria: CarCriteria): Promise<CarItem[]> {
    const url = `http://${this.host}:3000/cars`;
    const response = await axios.get(url, {params: criteria});
    return response.data;
  }

  public async getCar(carId: string): Promise<CarItem> {
    const url = `http://${this.host}:3000/cars/${carId}`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getLocations(): Promise<Location[]> {
    const url = `http://${this.host}:3000/locations`
    const response = await axios.get(url);
    return response.data;
  }
}