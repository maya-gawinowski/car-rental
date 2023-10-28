export type RootStackParamList = {
  WelcomeScreen: undefined
  DuHastScreen: undefined
  DuHastMichScreen: undefined
  MyReservationScreen: undefined
  LogInScreen: undefined
  CarDisplayScreen: {
    selectedPlace: string;
    departureDate: Date;
    returnDate: Date;
    selectedSeatsNumber: number;
    locations: string[];
  };
  CarPageScreen: {
    carId: string;
    departureDate: Date;
    returnDate: Date;
  }
}