import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React from "react";


const background = require('../icons/background-or.png');

type CarPageRouteParams = {
  carId: string;
};
type RootStackParamList = {
  CarPageScreen: CarPageRouteParams;
};
type CarPageScreenRouteProp = RouteProp<RootStackParamList, 'CarPageScreen'>;
type CarPageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarPageScreen'>
type Props = {
  route: CarPageScreenRouteProp;
  navigation: CarPageScreenNavigationProp;
};

const CarPageScreen: React.FC<Props> = ({route, navigation}) => {
  const { carId } = route.params;
  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode={"cover"} style={styles.image}>
        <Text>You have chosen car: {carId}</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
})

export default CarPageScreen