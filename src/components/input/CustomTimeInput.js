import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Images, Colors, WindowWidth as wp, Fonts, ResponsiveFont } from "../../assets";
import { ToastMsg } from "../Toast";
import { useTranslation } from "../customhooks";
export const CustomTimeInput = ({
  placeholder = "HH:MM",
  onTimeChange,
  width = "48%",
  value,
  editable = true,
  paddingVertical = '0%'
}) => {
  const t=useTranslation()


  const handleTimeChange = (text) => {
    let formattedText = text.replace(/[^0-9]/g, "");

    if (formattedText.length > 4) return;

    let newText = "";
    if (formattedText.length > 0) newText += formattedText.substring(0, 2);
    if (formattedText.length > 2) newText += ":" + formattedText.substring(2, 4);

    if (formattedText.length === 4) {
      const hours = parseInt(formattedText.substring(0, 2), 10);
      const minutes = parseInt(formattedText.substring(2, 4), 10);

      const isValidTime = hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;

      if (!isValidTime) {
        ToastMsg(t('EnterValidTime24H'));
        return;
      }
    }

    // No setTime here
    onTimeChange && onTimeChange(newText);
  };

  const clearTime = () => {
    onTimeChange && onTimeChange("");
  };


  return (
    <View style={[styles.container, { width ,paddingVertical}]}>
      <TouchableOpacity style={styles.iconWrapper}>
        <Image source={Images.time2} style={styles.icon} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={value || ""}
        placeholder={placeholder}
        keyboardType="numeric"
        maxLength={5}
        onChangeText={handleTimeChange}
        placeholderTextColor={Colors.black}
        editable={editable !== false}
      />

      {value && editable ? (
        <TouchableOpacity onPress={clearTime} style={styles.iconWrapper}>
          <Image source={Images.cross_icon} style={styles.icon} />
        </TouchableOpacity>
      ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    fontSize: ResponsiveFont(15),
    color: Colors.black,
    textAlignVertical: "center",
    fontFamily: Fonts.Regular
  },
  iconWrapper: {
    padding: 8,

  },
  icon: {
    width: wp * 5 / 100,
    height: wp * 5 / 100,
    resizeMode: 'contain',
  },
});

