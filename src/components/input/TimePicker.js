import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Colors } from '../../assets';

export const TimePicker = ({
   value, 
   onChange,
    label = "Select Time", 
    width = '48%',
    minTime = null, // NEW: Minimum selectable time

   }) => {
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value ? moment(value, 'HH:mm').toDate() : new Date());

  const handleChange = (event, date) => {
    setShow(false);
    if (date) {

      if (minTime && moment(date).isBefore(moment(minTime, 'HH:mm'))) {
        Alert.alert("Invalid Time", `Please select a time after ${minTime}`);
        return;
      } 

      const formattedTime = moment(date).format('HH:mm');
      setSelectedTime(date);
      onChange && onChange(formattedTime);
    }
  };

  return (
    <View style={{ width }}>
      <Text style={{ marginBottom: 6, color: Colors.black }}>{label}</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          borderWidth: 1,
          borderColor: Colors.blue,
          padding: 12,
          borderRadius: 10,
          backgroundColor: Colors.white
        }}
      >
        <Text style={{ color: Colors.black }}>
          {value || 'HH:MM'}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={handleChange}
          display={Platform.OS === 'ios' ? 'spinner' : 'spinner'} // or "default" if you prefer
        />
      )}
    </View>
  );
};

