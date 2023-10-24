import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, SafeAreaView, ScrollView, Text, View, Platform, Button} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {NavigationProp} from '../App';
import ReservationCard from './components/ReservationCard'
import {AppRoundButton} from "../welcome-screen/components/AppRoundButton";
import CarCard from "../car-display/components/CarCard"
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons'; 

const logo = require('../icons/car-logo.png');
const background = require('../icons/background-or.png');
interface DuProps {
  navigation: NavigationProp
}

interface Car {
    id: string;
    brand: string;
    model: string;
    pricePerDay: number;
    numberOfSeats: number;
    isAutomatic: boolean;
    isElectric: boolean;
    picture: string;
}

const cars: Car[] = [
    {
        "id": "1",
        "model": "Volkswagen Golf",
        "brand": "Volkswagen",
        "pricePerDay": 60,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1618767747322-64e376fd4826?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
      },
      {
        "id": "2",
        "model": "Renault Clio",
        "brand": "Renault",
        "pricePerDay": 55,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1666335009171-3ddc17937d6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        "id": "3",
        "model": "BMW 3 Series",
        "brand": "BMW",
        "pricePerDay": 80,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1619444033144-0d879522df42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
      },
      {
        "id": "4",
        "model": "Ford Focus",
        "brand": "Ford",
        "pricePerDay": 55,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1582467029213-ce71667c2e28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
      },
]

const userInfo = {
  name: "John Doe",
  email: "johndoe@example.com"
};

export interface Reservation {
  id: string;
  start: Date;
  end: Date;
  carId: string;
  locationId: string;
  userId: string;
}

const pastReservations: Reservation[] = [
  {
      "id": "1",
      "start": new Date("2016-01-04 10:34:23"),
      "end": new Date("2016-01-04 10:34:23"),
      "carId": "5",
      "locationId": "1",
      "userId": "2",
    },
    {
      "id": "1",
      "start": new Date("2016-01-04 10:34:23"),
      "end": new Date("2016-01-04 10:34:23"),
      "carId": "5",
      "locationId": "1",
      "userId": "2",
    },
    {
      "id": "1",
      "start": new Date("2016-01-04 10:34:23"),
      "end": new Date("2016-01-04 10:34:23"),
      "carId": "5",
      "locationId": "1",
      "userId": "2",
    },
    {
      "id": "1",
      "start": new Date("2016-01-04 10:34:23"),
      "end": new Date("2016-01-04 10:34:23"),
      "carId": "5",
      "locationId": "1",
      "userId": "2",
    },
]

const MyReservationScreen = ({navigation}: DuProps) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
        const url = `http://${host}:3000/locations`
        const response = await axios.get(url)
        //setLocations(response.data)
      } catch (error) {
        console.error('There was an error fetching data', error)
      }
    }

    fetchData()
  }, [])

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
                    {pastReservations.map((reservation, index) => (
                    <ReservationCard key={index} reservation={reservation}/>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={styles.mainView}>
                <Text style={styles.titleText}>Past reservations</Text>
                <ScrollView>
                    {pastReservations.map((reservation, index) => (
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
  logoView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    height: 200,
    width: 200
  },
  rentingPlaceTextView: {
    flex: 0.5,
    margin: 0,
    justifyContent: 'center',
  },
  datePickerView: {
    flex: 1,
    flexDirection: 'row',
  },
  singleDatePickerView: {
    flex: 1,
    alignItems: 'stretch',
    alignSelf: 'flex-start',
    justifyContent: "space-evenly"
  },
  seatNumberTextView: {
    flex: 0.5
  },
  seatNumberView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  buttonView: {
    flex: 1,
    justifyContent: "center"
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
