import React, {useState} from "react";
import {TextInput, StyleSheet} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {goLessColors} from "../colors";

export const AppSingleDatePicker = ({selectedDate, setSelectedDate}: {
  selectedDate: Date,
  setSelectedDate: (date: Date) => void
}) => {

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  const handleConfirm = (date: Date, setSelectedDate: { (date: Date): void; (arg0: any): void; }) => {
    setSelectedDate(date);
    hideDatePicker()
  };

  return (
    <TextInput
      style={styles.input}
      placeholder={selectedDate.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit"
      })}
      onPressIn={showDatePicker}
    >
      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="datetime"
        onConfirm={date => handleConfirm(date, setSelectedDate)}
        onCancel={hideDatePicker}
      />
    </TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    fontWeight: "bold",
    fontSize: 18,
    color: goLessColors.darkGrey
  },
})