import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const DateOfBirthPicker = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date of Birth</Text>

      {/* Step 1: Select Day */}
      <Text style={styles.stepLabel}>Step 1: Select Day</Text>
      <Picker
        selectedValue={day}
        onValueChange={(value) => setDay(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Day" value="" />
        {days.map((d) => (
          <Picker.Item key={d} label={d} value={d} />
        ))}
      </Picker>

      {/* Step 2: Select Month (after day is selected) */}
      {day ? (
        <>
          <Text style={styles.stepLabel}>Step 2: Select Month</Text>
          <Picker
            selectedValue={month}
            onValueChange={(value) => setMonth(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Month" value="" />
            {months.map((m) => (
              <Picker.Item key={m} label={m} value={m} />
            ))}
          </Picker>
        </>
      ) : null}

      {/* Step 3: Select Year (after month is selected) */}
      {month ? (
        <>
          <Text style={styles.stepLabel}>Step 3: Select Year</Text>
          <Picker
            selectedValue={year}
            onValueChange={(value) => setYear(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Year" value="" />
            {years.map((y) => (
              <Picker.Item key={y} label={y} value={y} />
            ))}
          </Picker>
        </>
      ) : null}

      {/* Optional: Final output */}
      {year ? (
        <Text style={styles.result}>
          Selected Date: {day.padStart(2, '0')}-{month.padStart(2, '0')}-{year}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  stepLabel: {
    marginTop: 10,
    fontWeight: '600',
  },
  picker: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginVertical: 4,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: 'green',
  },
});

