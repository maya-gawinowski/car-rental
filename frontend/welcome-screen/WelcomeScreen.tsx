import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { NavigationProp } from '../App';
import { AppSingleDatePicker } from './components/AppSingleDatePicker';
import { AppButton } from '../components/AppButton';
import { goLessColors } from './colors';
import { AppRoundButton } from './components/AppRoundButton';
import { Location } from '../../backend/dataModel';
import { RestClient } from '../RestClient/RestClient';

const logo = require('../icons/car-logo.png');
const background = require('../icons/background-or.png');
interface DuProps {
  navigation: NavigationProp;
}

const WelcomeScreen = ({ navigation }: DuProps) => {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [selectedSeatsNumber, setSelectedSeatsNumber] = useState(4);
  const [locations, setLocations] = useState<Location[]>([]);
  const restClient = RestClient.getInstance();

  useEffect(() => {
    restClient
      .getLocations()
      .then(response => setLocations(response))
      .catch(error => console.error('Error fetching locations', error));
  }, []);

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
            <Text style={styles.titleText}>Renting place</Text>
          </View>
          <SelectList
            dropdownStyles={{
              backgroundColor: goLessColors.lightBlue,
              position: 'absolute',
              top: 40,
              width: '100%',
              zIndex: 999,
            }}
            dropdownTextStyles={{
              color: 'white',
            }}
            inputStyles={{
              color: goLessColors.darkBlue,
            }}
            boxStyles={{
              borderColor: goLessColors.darkBlue,
            }}
            setSelected={(val: React.SetStateAction<string>) =>
              setSelectedPlace(val)
            }
            data={locations.map(location => {
              return { label: location.name, value: location.name };
            })}
            save="value"
            placeholder="Choose your city"
          />
          <View style={styles.datePickerView}>
            <View style={styles.singleDatePickerView}>
              <Text style={styles.titleText}>Departure date</Text>
              <AppSingleDatePicker
                selectedDate={departureDate}
                setSelectedDate={setDepartureDate}
              />
            </View>
            <View style={styles.singleDatePickerView}>
              <Text style={styles.titleText}>Return date</Text>
              <AppSingleDatePicker
                selectedDate={returnDate}
                setSelectedDate={setReturnDate}
              />
            </View>
          </View>
          <View style={styles.seatNumberTextView}>
            <Text style={styles.titleText}>Seats number</Text>
          </View>
          <View style={styles.seatNumberView}>
            <AppRoundButton
              onPress={() => {
                setSelectedSeatsNumber(selectedSeatsNumber - 1);
              }}
              title={'-'}
            />
            <Text style={styles.numberText}>{selectedSeatsNumber}</Text>
            <AppRoundButton
              onPress={() => {
                setSelectedSeatsNumber(selectedSeatsNumber + 1);
              }}
              title={'+'}
            />
          </View>
          <View style={styles.buttonView}>
            <AppButton
              title="Find a car"
              onPress={() =>
                navigation.navigate('CarDisplayScreen', {
                  selectedPlace: selectedPlace,
                  departureDate: departureDate,
                  returnDate: returnDate,
                  selectedSeatsNumber: selectedSeatsNumber,
                  locations: locations.map(location => location.name),
                })
              }
            />
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: 200,
    width: 200,
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
    justifyContent: 'space-evenly',
  },
  seatNumberTextView: {
    flex: 0.5,
  },
  seatNumberView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: goLessColors.darkBlue,
  },
  numberText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: goLessColors.darkGrey,
    fontVariant: ['tabular-nums'],
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WelcomeScreen;
