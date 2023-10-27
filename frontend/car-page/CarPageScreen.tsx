import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { goLessColors } from '../welcome-screen/colors';
import { AppButton } from '../components/AppButton';
import { RootStackParamList } from '../RootStackParamList';
import { RestClient } from '../RestClient/RestClient';
import { Car } from '../../backend/dataModel';

const background = require('../icons/background-or.png');

type CarPageScreenRouteProp = RouteProp<RootStackParamList, 'CarPageScreen'>;
type CarPageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CarPageScreen'
>;
type Props = {
  route: CarPageScreenRouteProp;
  navigation: CarPageScreenNavigationProp;
};

const CarPageScreen: React.FC<Props> = ({ route, navigation }) => {
  const { carId, departureDate, returnDate, selectedPlace, selectedSeatsNumber } = route.params;
  const [car, setCar] = useState<Car>({} as Car);
  const formattedDepartureDate = departureDate.toDateString();
  const formattedReturnDate = returnDate.toDateString();
  const restClient = RestClient.getInstance();

  useEffect(() => {
    restClient
      .getCar(carId)
      .then(response => {
        setCar(response);
      })
      .catch(error => {
        console.error(`Error fetching car ${carId}`, error);
      });
  }, [carId]);

  function getTotalPrice() {
    const diff = Math.abs(departureDate.getTime() - returnDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays * car.pricePerDay;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      >
        <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 30, color: '#22668D' }}>&lt;</Text>
      </TouchableOpacity>
        <View style={styles.mainView}>
          <Image source={{ uri: car.picture }} style={styles.image} />
          <View style={styles.infoPanel}>
            <Text style={styles.modelText}>{car.model}</Text>
            <Text style={styles.priceText}>{car.pricePerDay} €/day</Text>
          </View>
          <View style={styles.detailsPanel}>
            <Text style={styles.detailText}>{car.numberOfSeats} seats</Text>
            <Text style={styles.detailText}>
              {car.isAutomatic ? 'Automatic' : 'Manual'} seats
            </Text>
          </View>
          <View style={styles.pricePanel}>
            <Text style={styles.detailText}>
              {formattedDepartureDate} - {formattedReturnDate}
            </Text>
            <Text style={styles.detailText}>
              Total price: {getTotalPrice()} €
            </Text>
          </View>
          <View style={styles.buttonPanel}>
            <AppButton onPress={() => {navigation.navigate('CarReservationScreen', {
      carModel: car.model,
      carId: car.id,
      departureDate: departureDate,
      returnDate: returnDate,
      totalPrice: getTotalPrice(),
      selectedSeatsNumber: selectedSeatsNumber,
      selectedPlace: selectedPlace,
    });}} title={'Rent'}></AppButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  mainView: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    rowGap: 10,
  },
  image: {
    flex: 2,
    borderRadius: 1,
  },
  infoPanel: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  detailsPanel: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  pricePanel: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buttonPanel: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  modelText: {
    fontSize: 20,
    fontWeight: '700',
    color: goLessColors.darkBlue,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFB631',
  },
  detailText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: goLessColors.darkBlue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    top: StatusBar.currentHeight, // This accounts for the status bar height
    left: 0,
    right: 0,
    zIndex: 1

  },
});

export default CarPageScreen;
