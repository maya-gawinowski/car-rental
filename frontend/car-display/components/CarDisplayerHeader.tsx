import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  

type CustomHeaderProps = {
    navigation: StackNavigationProp<any, any>;
    title: string;
    subtitle: string;
  };
const CustomHeader = ({ navigation, title, subtitle }: CustomHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
        <Icon name="close" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="settings" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#22668D',
    padding: 10,
    top: StatusBar.currentHeight, // This accounts for the status bar height
    left: 0,
    right: 0,
    zIndex: 1
  },
  
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  iconContainer: {
    padding: 10,
  },
});

export default CustomHeader;
