import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {goLessColors} from "../../welcome-screen/colors";
import React from "react";


export const ChooseButton = ({onPress}: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.chooseButtonContainer}>
    <Text style={styles.appButtonText}>Choose</Text>
  </TouchableOpacity>

);

const styles = StyleSheet.create({
  chooseButtonContainer: {
    elevation: 8,
    backgroundColor: goLessColors.darkBlue,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 5,
    right: 15
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center"
  }

})