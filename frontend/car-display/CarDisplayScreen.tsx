import React, {useEffect, useState} from 'react'
import {ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native'
import axios from 'axios'
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CarCard from './components/CarCard';
import CustomHeader from './components/CarDisplayerHeader';
import {RootStackParamList} from "../RootStackParamList";

const background = require('../icons/background-or.png');

type CarsListScreenRouteProp = RouteProp<RootStackParamList, 'CarDisplayScreen'>;
type CarsListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDisplayScreen'>;


type Props = {
  route: CarsListScreenRouteProp;
  navigation: CarsListScreenNavigationProp;
};
type carItem = {
    id: string;
    brand: string;
    model: string;
    pricePerDay: number;
    numberOfSeats: number;
    isAutomatic: boolean;
    isElectric: boolean;
    picture: string;
}

const CarDisplayScreen: React.FC<Props> = ({ route, navigation }) => {
  const { selectedPlace, departureDate, returnDate, selectedSeatsNumber, locations } = route.params;
  const [cars, setCars] = useState<carItem[]>([]);
  const [loading, setLoading] = useState(true);
  const formattedDepartureDate = departureDate.toDateString();
  const formattedReturnDate = returnDate.toDateString();
  console.log({
    selectedPlace,
    departureDate,
    returnDate,
    selectedSeatsNumber,
  });

  useEffect(() => {
    const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
    const url = `http://${host}:3000/cars?location=${selectedPlace}`;
    axios.get(url)
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, [selectedPlace]);

  return (
    <View style={styles.container}>
    <ImageBackground source={background} resizeMode={"cover"} style={styles.image}>
    <CustomHeader 
          navigation={navigation}
          title={selectedPlace} 
          subtitle={`${formattedDepartureDate} - ${formattedReturnDate}`} 
        />
    <SafeAreaView>
      <ScrollView>
        {cars.map((car, index) => (
          <CarCard key={index} car={car} onPress={() => navigation.navigate('CarPageScreen', {
            carId: car.id,
            departureDate: departureDate,
            returnDate: returnDate
          })} />
        ))}
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
