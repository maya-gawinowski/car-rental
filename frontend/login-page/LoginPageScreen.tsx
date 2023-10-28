import { Image, ImageBackground, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { AppSingleDatePicker } from './components/AppSingleDatePicker';
import { AppButton } from '../components/AppButton';
import { goLessColors } from './colors';
import { AppRoundButton } from './components/AppRoundButton';
import { RestClient } from '../RestClient/RestClient';

const logo = require('../icons/car-logo.png');
const background = require('../icons/background-or.png');

const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode={'cover'}
        style={styles.image}
      >
        <View style={styles.mainView}>

          <View style={styles.rentingPlaceTextView}>
            <Text style={styles.titleText}>Log in </Text>

          </View>
          <View style={styles.logoView}>
            <Image source={logo} style={styles.logoImage} />
          </View>

          <View style={styles.inputContainer}>

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.buttonView}>
            <AppButton title="Connect" />
          </View>
          <View style={styles.buttonView}>
            <AppButton title="Create account" />
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
    flex: 0.5,
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
   borderBottomWidth: 2, // Add a border line at the bottom
   borderColor: goLessColors.darkBlue, // Set the border line color
   padding: 5,
   fontSize: 16,
   color: goLessColors.darkBlue, // Set input text color
 },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: goLessColors.darkBlue,
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

export default LogInScreen;
