export type RootStackParamList = {
  WelcomeScreen: undefined
  DuHastScreen: undefined
  DuHastMichScreen: undefined
  CarDisplayScreen: {
    selectedPlace: string;
    departureDate: Date;
    returnDate: Date;
    selectedSeatsNumber: number;
    locations: string[];
  };
  CarPageScreen: {
    carId: string;
  }
}