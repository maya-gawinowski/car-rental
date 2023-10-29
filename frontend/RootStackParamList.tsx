import { Car } from "../backend/dataModel";

export type RootStackParamList = {
  WelcomeScreen: undefined
  DuHastScreen: undefined
  DuHastMichScreen: undefined
  MyReservationScreen: undefined
  Confirmation: undefined
  SignInScreen: undefined
  LogInScreen: undefined
  CarDisplayScreen: {
    selectedPlace: string;
    departureDate: Date;
    returnDate: Date;
    selectedSeatsNumber: number;
    locations: string[];
  };
  CarPageScreen: {
    selectedPlace: string;
    carId: string;
    departureDate: Date;
    selectedSeatsNumber: number;
    returnDate: Date;
  }
  CarReservationScreen: {
    carModel: string;
    carId: string;
    departureDate: Date;
    returnDate: Date;
    totalPrice: number;
    selectedSeatsNumber: number;
    selectedPlace: string;
  }
}