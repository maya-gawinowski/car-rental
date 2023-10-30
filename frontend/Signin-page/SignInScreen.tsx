import React, { useState } from 'react'
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { AppButton } from '../components/AppButton'
import { goLessColors } from './colors'
import { RestClient } from '../RestClient/RestClient'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../RootStackParamList'

const logo = require('../icons/car-logo.png')
const background = require('../icons/background-or.png')

const SignInScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  if (RestClient.getInstance().isLoggedIn) {
    navigation.navigate('WelcomeScreen')
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode={'cover'}
        style={styles.image}
      >
        <View style={styles.mainView}>
          <View style={styles.rentingPlaceTextView}>
            <Text style={styles.titleText}>Sign In</Text>
            <Image source={logo} style={styles.logoImage} />
          </View>
          <View style={styles.logoView}></View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
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
            <Text style={styles.label}>Confirm Email Address</Text>
            <TextInput
              style={styles.input}
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              placeholder="Confirm your email"
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.buttonView}>
            <AppButton
              title="Sign In"
              onPress={() =>
                RestClient.getInstance()
                  .createUser(name, email, password)
                  .then(() => navigation.navigate('LogInScreen'))
                  .catch((error) => alert(error))
              }
            />
          </View>
          <View style={styles.buttonView}>
            <AppButton
              title="Have an Account?"
              onPress={() => navigation.navigate('LogInScreen')}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

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
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: 50,
    width: 50,
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
    padding: 0,
    margin: 0,
    color: goLessColors.darkBlue,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: goLessColors.darkBlue,
    padding: 0,
    fontSize: 16,
    color: goLessColors.darkBlue,
  },
  buttonView: {
    flex: 0.5,
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
})

export default SignInScreen
