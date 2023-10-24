import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CarCard from './components/CarCard';
import CustomHeader from './components/CarDisplayerHeader';
import { RootStackParamList } from '../RootStackParamList';
import { Car } from '../../backend/dataModel';
import { RestClient } from '../RestClient/RestClient';

const background = require('../icons/background-or.png');

type CarsListScreenRouteProp = RouteProp<
  RootStackParamList,
  'CarDisplayScreen'
>;
type CarsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CarDisplayScreen'
>;

type Props = {
  route: CarsListScreenRouteProp;
  navigation: CarsListScreenNavigationProp;
};

const CarDisplayScreen: React.FC<Props> = ({ route, navigation }) => {
  const {
    selectedPlace,
    departureDate,
    returnDate,
    selectedSeatsNumber,
    locations,
  } = route.params;
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const formattedDepartureDate = departureDate.toDateString();
  const formattedReturnDate = returnDate.toDateString();
  const restClient = RestClient.getInstance();

  console.log({
    selectedPlace,
    departureDate,
    returnDate,
    selectedSeatsNumber,
  });

  useEffect(() => {
    restClient
      .searchCars({ locationName: selectedPlace, seats: selectedSeatsNumber })
      .then(response => {
        setCars(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setLoading(false);
      });
  }, [selectedPlace]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode={'cover'}
        style={styles.image}
      >
        <View style={styles.header}>
          <CustomHeader
            navigation={navigation}
            title={selectedPlace}
            subtitle={`${formattedDepartureDate} - ${formattedReturnDate}`}
          />
        </View>
        <SafeAreaView style={styles.content}>
          <ScrollView>
            {cars.map((car, index) => (
              <CarCard
                key={index}
                car={car}
                onPress={() =>
                  navigation.navigate('CarPageScreen', {
                    carId: car.id,
                    selectedPlace: selectedPlace,
                    selectedSeatsNumber: selectedSeatsNumber,
                    departureDate: departureDate,
                    returnDate: returnDate,
                  })
                }
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flex: 1,  
  },
  content: {
    flex: 7,  
  },
  carItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CarDisplayScreen;
