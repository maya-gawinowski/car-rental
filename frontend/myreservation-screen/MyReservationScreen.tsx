import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, SafeAreaView, ScrollView, Text, View, Button} from 'react-native';
import {NavigationProp} from '../App';
import ReservationCard from './components/ReservationCard'
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
  const [pastReservations, setPastReservations] = useState<Reservation[]>([]);
  const [upcomingReservations, setUpcomingReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    restClient
      .getReservationsByUser('123')
      .then(response => {
        const now = new Date(); // Current date
        const past: React.SetStateAction<Reservation[]> = [];
        const upcoming: React.SetStateAction<Reservation[]> = [];
  
        response.forEach((reservation: Reservation) => {
          if (new Date(reservation.end) < now) { 
            past.push(reservation);
          } else {
            upcoming.push(reservation);
          }
        });
  
        setPastReservations(past);
        setUpcomingReservations(upcoming);
      })
      .catch(error => {
        console.error(`Error fetching user`, error);
      });
  }, []);
  

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
                {upcomingReservations.map((reservation, index) => (
                  <ReservationCard key={index} reservation={reservation} />
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
