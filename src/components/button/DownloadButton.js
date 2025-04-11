import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { Colors, Fonts, Images, ResponsiveFont, WindowHeight as hp, opacityOfButton, WindowWidth as wp } from '../../assets';
export const DownloadButton = ({
  title,
  onPress,
  backgroundColor = Colors.shadowBlue,
  textColor = Colors.black,
  fontSize = ResponsiveFont(20),
  disabled = false,
  style = {},
  textStyle = {},
  width = '95%',
  height = hp * 0.07,
  paddingVertical = "2%",
  paddingHorizontal = "5%",
  borderRadius = 16,
  isborder = true,
  borderColor = Colors.blue,
  heading = ''
}) => {
  return (
    <View  style={{marginVertical:'2%'}}>
      <Text style={styles.heading}>{heading}</Text>
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
            borderWidth: isborder ? 1 : 0
          },
          disabled && styles.disabledButton,
          style,
        ]}
        onPress={onPress}
        activeOpacity={opacityOfButton}
        disabled={disabled}
      >
        <View style={styles.placeHolderContainer}>
          <Image
            source={Images.pdf}
            style={styles.iconStyle}
          />
          <Text style={[styles.buttonText,
          {
            color: textColor,
            fontSize: fontSize
          },
            textStyle
          ]}>
            {title}
          </Text>
        </View>
        <Image
            source={Images.icon_download}
            style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 5,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.Bold,
    lineHeight: ResponsiveFont(24),
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  placeHolderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical:'7%',

  },
  iconStyle: {
    width: wp * 10 / 100,
    height: wp * 10 / 100,
    resizeMode: 'contain',
    marginHorizontal: wp * 1 / 100
  },
  heading: {
    fontFamily: Fonts.SemiBold,
    fontSize: ResponsiveFont(16),
    lineHeight: ResponsiveFont(18),
    color: Colors.black,
    marginVertical:wp*3/100,
  }
});
