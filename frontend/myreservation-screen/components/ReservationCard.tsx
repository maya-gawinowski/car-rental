import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import { RestClient } from '../../RestClient/RestClient';
import { Car } from '../../../backend/dataModel';


interface ReservationCardProps {
    reservation: {
      id: string;
      start: Date | null;
      end: Date | null;
      carId: string;
      locationId: string;
      userId: string;
    };
}
const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const startDate = typeof reservation.start === 'string' 
  ? new Date(reservation.start) 
  : reservation.start;
  const endDate = typeof reservation.end === 'string' 
  ? new Date(reservation.end) 
  : reservation.end;
  const restClient = RestClient.getInstance();
  const [car, setCar] = useState<Car>({} as Car);

  useEffect(() => {
    restClient
      .getCar(reservation.carId)
      .then(response => {
        setCar(response);
      })
      .catch(error => {
        console.error(`Error fetching car ${reservation.carId}`, error);
      });
  }, [reservation.carId]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Image source={{ uri: car.picture }} style={styles.image} />  
        <Text style={styles.modelText}>{startDate?.toDateString()} | {endDate?.toDateString()}</Text>
        <View style={styles.contentContent}>
          <Text style={styles.contentText}>{car.brand}</Text>
          <Text style={styles.contentText}>{car.model}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    alignItems: 'center',  
    flex: 1,  
    justifyContent: 'flex-start',  
  },
card: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5, 
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FFFFFF', 
    width: 360, 
    height: 206, 
    // Shadow properties mainly for iOS
    shadowColor: '#40000000',
    shadowOffset: { width: 0, height: 4 }, // This assumes the shadow falls below the box (4.dp)
    shadowOpacity: 0.25, // Translating the color's opacity
    shadowRadius: 4, 
    // Elevation for Android
    elevation: 4,
    justifyContent: 'center'
  }
,   
contentContent: {
  flexDirection: 'column', // This makes the children lay out horizontally
    position: 'absolute',
    bottom: 5,
    left: 15,
},
contentText: {
  fontSize: 15,
  fontWeight: '700',
  marginRight: 7
},
  modelText: {
    fontSize: 15,
  fontWeight: '700',
  color: '#FFB631',
  position: 'absolute',  // Position it absolutely within the card
  top: 5,
  left: 5
  },
  image: {
    width: 140,  // Increased the width and height
    height: 140,
    borderRadius: 70, // This will make the image circular which can be a nice touch
    marginBottom: 15  // Add some spacing below the image
  },
});

export default ReservationCard;
