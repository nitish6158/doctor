import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors, Fonts, Images, ResponsiveFont, WindowHeight as hp, WindowWidth as wp, opacityOfButton } from '../../assets';
export const CustomButton = ({
  title,
  onPress,
  backgroundColor = Colors.blue,
  textColor = Colors.white,
  fontSize = ResponsiveFont(16),
  disabled = false,
  style = {},
  textStyle = {},
  width = '95%',
  height = hp * 0.07,
  paddingVertical = "2%",
  paddingHorizontal = "5%",
  borderRadius = 16,
  isborder = false,
  borderColor = Colors.blue,
  type = 'none',// home,
  marginVertical = '0%'
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const handlePress = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      await onPress?.();
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderRadius,
          borderColor,
          paddingVertical,
          paddingHorizontal,
          width,
          height,
          borderWidth: isborder ? 2 : 0,
          marginVertical
        },
        (disabled || isProcessing) && styles.disabledButton,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={opacityOfButton}
      disabled={disabled}
    >
      <Text style={[styles.buttonText,
      {
        color: textColor,
        fontSize: fontSize
      },
        textStyle
      ]}>
        {title}
      </Text>

      {type === 'home' &&
        <Image
          source={Images.icon_arrow_Right}
          style={styles.iconstyle}
        />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row'
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(13),
    // lineHeight: ResponsiveFont(20),
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  iconstyle: {
    width: (wp * 5) / 100,
    height: (wp * 5) / 100,
  }
});
