import React from "react";
import { View, StyleSheet } from "react-native";
import { WindowWidth as wp,Colors } from "../../assets";

export const ListingCard = ({ children, customStyles }) => {
  return <View style={[styles.container, customStyles]}>{children}</View>;
};
const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignItems: 'center',
    borderRadius: wp*3/100,
    borderColor:Colors.blue,
    backgroundColor: Colors.white,
    borderWidth:wp*0.2/100,
    padding:'2%',
    marginVertical:wp*1.5/100
  },
});