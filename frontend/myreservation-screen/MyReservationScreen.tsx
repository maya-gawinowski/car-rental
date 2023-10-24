import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, SafeAreaView, ScrollView, Text, View, Platform, Button} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {NavigationProp} from '../App';
import ReservationCard from './components/ReservationCard'
import {AppRoundButton} from "../welcome-screen/components/AppRoundButton";
import CarCard from "../car-display/components/CarCard"
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons'; 
import { RestClient } from '../RestClient/RestClient';
import { Reservation } from '../../backend/dataModel';

const logo = require('../icons/car-logo.png');
const background = require('../icons/background-or.png');
interface DuProps {
  navigation: NavigationProp
}


const userInfo = {
  name: "John Doe",
  email: "johndoe@example.com"
};

const MyReservationScreen = ({navigation}: DuProps) => {

  const restClient = RestClient.getInstance();
  const [reservations, setReservations] = useState<Reservation[]>([]); 

  useEffect(() => {
    restClient
      .getReservationsByUser('123')
      .then(response => {
        setReservations(response);
        console.log(response);
      })
      .catch(error => {
        console.error(`Error fetching user`, error);
      });
    });


  return (
    <View
      style={styles.container}>
      <ImageBackground source={background} resizeMode={"cover"} style={styles.image}>
        <View
          style={styles.mainView}>
           <SafeAreaView>
                <Text style={styles.titleText}>Personal information</Text>
                <Text>{userInfo.name}</Text>
                <Text>{userInfo.email}</Text>
            </SafeAreaView>
            <View style={styles.disconnectButton}>
            <Button title="disconnect" ></Button>
            </View>
            <SafeAreaView style={styles.mainView}>
                <Text style={styles.titleText}>Upcoming reservations</Text>
                <ScrollView>
                    {reservations.map((reservation, index) => (
                    <ReservationCard key={index} reservation={reservation}/>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={styles.mainView}>
                <Text style={styles.titleText}>Past reservations</Text>
                <ScrollView>
                    {reservations.map((reservation, index) => (
                    <ReservationCard key={index} reservation={reservation} />
                    ))}
                </ScrollView>
            </SafeAreaView>
         </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This will make the overlay fill the entire parent container
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% opacity
    zIndex: 0,  // Ensure the overlay appears below the text
  },
  mainView: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    rowGap: 10
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#22668D'
  },
  disconnectButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default MyReservationScreen
