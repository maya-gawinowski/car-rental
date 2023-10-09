import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ChooseButton} from "./ChooseButton";

interface CarCardProps {
    onPress: () => void,
    car: {
        id: string;
        brand: string;
        model: string;
        pricePerDay: number;
        numberOfSeats: number;
        isAutomatic: boolean;
        isElectric: boolean;
        picture: string;
    };
}
const CarCard = ({ car, onPress }: CarCardProps) => {
  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.modelText}>{car.model}</Text>
      <Text style={styles.priceText}>{car.pricePerDay} €/day</Text>
      <Image source={{ uri: car.picture }} style={styles.image} />
      <View style={styles.bottomLeftInfo}>
        <Text style={styles.seatsText}>{car.numberOfSeats} seats</Text>
        <Text style={styles.transmissionText}>{car.isAutomatic ? 'Automatic' : 'Manual'}</Text>
      </View>
      <ChooseButton onPress={onPress}></ChooseButton>
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
  modelText: {
    fontSize: 15,
  fontWeight: '700',
  color: '#22668D',
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

export default CarCard;
