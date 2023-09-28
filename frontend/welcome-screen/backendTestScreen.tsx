import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const CarsList = () => {
    type Car = {
        id: number;
        brand: string;
        model: string;
      };
      
      const [cars, setCars] = useState<Car[]>([]);
      

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:5000/cars');
        setCars(response.data);
      } catch (error) {
        console.error('There was an error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.brand} - {item.model}</Text>
        )}
      />
    </View>
  );
};

export default CarsList;
