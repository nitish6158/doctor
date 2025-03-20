import React from 'react';
import { StatusBar, View, SafeAreaView } from 'react-native';
import { Colors } from '../../assets';
const CustomStatusBar = () => {
  return (
    <SafeAreaView style={Colors.blue}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.blue}
        translucent={false}
      />
    </SafeAreaView>
  );
};

export default CustomStatusBar;
