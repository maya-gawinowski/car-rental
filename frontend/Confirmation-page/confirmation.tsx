import { Image, ImageBackground, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AppButton } from '../components/AppButton';
import { goLessColors } from './colors';

const logo = require('../icons/car-logo.png');
const background = require('../icons/background-or.png');

const Confirmation = ({ userEmail }) => {

  if (!userEmail) {
    userEmail = 'user@example.com';
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode={'cover'}
        style={styles.image}
      >
        <View style={styles.mainView}>
          <View style={styles.logoView}>
            <Image source={logo} style={styles.logoImage} />
          </View>
          <View style={styles.rentingPlaceTextView}>
            <Text style={styles.titleText}>Confirmation</Text>
            <Text style={styles.confirmationText}>
              Thank you for renting with us. A confirmation email has been sent at {userEmail}.
              You can also consult your reservation in your account page.
            </Text>
          </View>

          <View style={styles.buttonView}>
            <AppButton title="My Account" />
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
  mainView: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    rowGap: 10,
  },
  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: 150,
    width: 150,
  },
  rentingPlaceTextView: {
    flex: 0,
    margin: 0,
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 17,
    margin: 3,
    color: goLessColors.darkBlue,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: goLessColors.darkBlue,
    padding: 5,
    fontSize: 16,
    color: goLessColors.darkBlue,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: goLessColors.darkBlue,
  },
  confirmationText: {
    fontSize: 18,
    color: goLessColors.darkBlue,
    marginTop: 30,
    padding: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  accountButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1000,
    backgroundColor: '#22668D',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default Confirmation;
