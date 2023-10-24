import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity,  } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppButton } from '../components/AppButton';
import { goLessColors } from '../welcome-screen/colors';
import { RootStackParamList } from '../RootStackParamList';
import CustomHeader from "../car-display/components/CarDisplayerHeader";
import { RestClient } from '../RestClient/RestClient';
const background = require('../icons/background-or.png');

type SummaryScreenRouteProp = RouteProp<RootStackParamList, 'CarReservationScreen'>;

type Props = {
  route: SummaryScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'CarReservationScreen'>;  
};

const CarReservationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { carId, departureDate, returnDate, totalPrice, selectedSeatsNumber, selectedPlace, carModel } = route.params;
    console.log(route.params)
  const formattedDepartureDate = departureDate.toDateString();
  const formattedReturnDate = returnDate.toDateString();
  const restClient = RestClient.getInstance();
  const handleValidate = async  () => {
    await restClient
      .postReservation(carId, '', selectedPlace, departureDate, returnDate)
      .then(response => {
        console.log('Reservation done', response);
      })
      .catch(error => {
        console.error(`Error reserving car ${carId}`, error);
      });
  };
  return (
    <View style={styles.container}>
    <CustomHeader navigation={navigation} title="Summary" subtitle="Car Reservation"/>
      <ImageBackground
        source={background}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      >
        <View style={styles.mainView}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <Text style={styles.sectionText}>Place: {selectedPlace}</Text>
            <Text style={styles.sectionText}>Debut date: {formattedDepartureDate}</Text>
            <Text style={styles.sectionText}>End date: {formattedReturnDate}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Car</Text>
            <Text style={styles.sectionText}>Car: {carModel}</Text>
            <Text style={styles.sectionText}>Car price/day | Total price: {totalPrice} €</Text>
            <Text style={styles.sectionText}>{selectedSeatsNumber} adults</Text>
          </View>
          <View style={styles.fixedButton} >
          <AppButton  title="Validate" onPress={handleValidate} />
            </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',  
  },
  mainView: {
    flex: 1,
    padding: 20,
    paddingTop: 120,  
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    marginRight: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: '700',
    color: goLessColors.darkBlue,
    textAlign: 'center',  
    flex: 1,  
  },
  section: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,  
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: goLessColors.darkBlue,
    marginBottom: 5,
  },
  sectionText:{
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default CarReservationScreen;
