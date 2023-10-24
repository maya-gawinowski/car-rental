import React from 'react';
import {Image, StyleSheet, Text, View, Button} from 'react-native';
import { format } from "date-fns";

interface ReservationCardProps {
    reservation: {
      id: string;
      start: Date;
      end: Date;
      carId: string;
      locationId: string;
      userId: string;
    };
}
const ReservationCard = ({ reservation }: ReservationCardProps) => {
  var formattedStartDate = format(reservation.start, "dd/mm/yyyy");
  var formattedEndDate = format(reservation.end, "dd/mm/yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.modelText}>{formattedStartDate} | {formattedEndDate}</Text>
        <View style={styles.contentContent}>
          <Text style={styles.contentText}>Car : {reservation.carId}</Text>
          <Text style={styles.contentText}>Location : {reservation.locationId}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    alignItems: 'center',  // Centers children horizontally
    flex: 1,  // Takes the full height available
    justifyContent: 'flex-start',  // Stacks children from the top
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
    height: 100, 
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
  priceText: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 20,
    fontWeight: '700', 
    color: '#FFB631',
  },
  image: {
    width: 140,  // Increased the width and height
    height: 140,
    borderRadius: 70, // This will make the image circular which can be a nice touch
    marginBottom: 15  // Add some spacing below the image
  },
  seatsText: {
    fontSize: 15, 
  fontWeight: '700', 
  color: '#22668D',
  marginRight: 7
  },
  transmissionText: {
    fontSize: 15, 
  fontWeight: '700', 
  color: '#22668D',
  marginLeft: 7,
  },
  bottomLeftInfo: {
    flexDirection: 'row', // This makes the children lay out horizontally
    position: 'absolute',
    bottom: 5,
    left: 15,
    alignItems: 'center',
  },
});

export default ReservationCard;
