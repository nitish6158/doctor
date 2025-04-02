//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Images } from '../../../assets';
import { useDeviceDimensions } from '../../../components/customhooks';
import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
const NotificationScreen = () => {
  const [gender, setGender] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const OPTIONS = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  return (
    <PaperProvider>
       <View style={{ margin: 16 }}>
        <Dropdown
          label="Gender"
          placeholder="Select Gender"
          options={OPTIONS} // ✅ Correct prop for dropdown items
          value={gender}
          onSelect={setGender} // ✅ Use onSelect instead of setValue
        />
      </View>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});


const mapStateToProps = state => {
  return {
    loading: false,
  };
};
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
