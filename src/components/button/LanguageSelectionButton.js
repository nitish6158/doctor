import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, FlatList } from 'react-native';
import { Colors, Fonts, ResponsiveFont, WindowWidth as wp, WindowHeight as hp, opacityOfButton, Images } from '../../assets';

export const LanguageSelectionButton = ({
  heading = "",
  placeholder = "Select",
  selectedValue,
  onValueChange,
  textColor = Colors.black,
  style = {},
  textStyle = {},
  type = 'english',
  onPress
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getIcons = () => {
    switch (type) {
      case 'english':
        return Images.english;
      case 'france':
        return Images.france;
      case 'arabic':
        return Images.arabic;
      default:
        return Images.user_icon_deactive;
    }
  };

  return (
    <View>
      <Text style={styles.heading}>{heading}</Text>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          {  
            backgroundColor:isPressed ? Colors.shadowBlue:Colors.white
           },
          style,
        ]}
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={opacityOfButton}
      >
        <View style={styles.dropsownTextContainer}>
          <Image source={getIcons()} style={styles.icon} />
          <Text style={[styles.dropdownText, { color: textColor }, textStyle]}>
            {selectedValue || placeholder}
          </Text>
        </View>
        <Image source={
          isPressed?
          Images.right_arrow:
          Images.light_right_arrow
          } style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: wp * 2.5 / 100,
    marginVertical: hp * 0.5 / 100,
    backgroundColor :Colors.white,
    width : '95%',
    height :hp * 0.07,
    borderRadius:16,

  },
  dropsownTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%'
  },
  dropdownText: {
    fontFamily: Fonts.Regular,
    fontSize: ResponsiveFont(16),
    marginLeft: '7%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.shadow,
  },
 
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(14),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.black
  },
});
