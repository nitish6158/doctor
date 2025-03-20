import React from "react";
import { View, StyleSheet } from "react-native";

export const FloatingBackgroundCard = ({ children, customStyles }) => {
  return <View style={[styles.container, customStyles]}>{children}</View>;
};
const styles = StyleSheet.create({
  container: {
    flex :1,
    width: '100%',
    alignSelf:'center',
    alignItems: 'center',
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    backgroundColor: "#fff",
  },
});