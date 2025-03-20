import React from "react";
import { View, ActivityIndicator, Modal, StyleSheet } from "react-native";
import { Colors } from "../../assets";
export const Loader = ({ visible = false, size = "large", color = Colors.white}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size={size} color={color} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.shadow
  },
});

