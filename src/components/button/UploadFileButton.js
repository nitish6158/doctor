import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { Colors, Fonts, Images, ResponsiveFont, WindowHeight as hp, opacityOfButton, WindowWidth as wp } from '../../assets';
import { useTranslation } from '../customhooks';
export const UploadFileButton = ({
  title,
  onPress,
  backgroundColor = Colors.upload_background,
  textColor = Colors.gray,
  fontSize = ResponsiveFont(16),
  disabled = false,
  style = {},
  textStyle = {},
  width = '95%',
  height = hp * 0.07,
  paddingVertical = "2%",
  paddingHorizontal = "5%",
  borderRadius = 16,
  isborder = true,
  borderColor = Colors.light_black,
  heading = '',
  fileurl = null,
  required = false
}) => {
  const t = useTranslation()
  return (
    <View style={{ marginVertical: '2%' }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Text style={styles.heading}>{heading}</Text>
        {required &&
          <Text style={styles.heading2}>*</Text>
        }
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: fileurl ? Colors.shadowBlue : Colors.upload_background,
            borderRadius,
            borderColor,
            paddingVertical,
            paddingHorizontal,
            width,
            height,
            borderWidth: fileurl ? 0 : 2,
            borderStyle: fileurl ? 'solid' : 'dashed'
          },
          disabled && styles.disabledButton,
          style,
        ]}
        onPress={onPress}
        activeOpacity={opacityOfButton}
        disabled={fileurl ? true : false}
      >
        <View style={styles.placeHolderContainer}>
          <Image
            source={Images.icon_upload}
            style={styles.iconStyle}
          />
          <Text style={[styles.buttonText,
          {
            color: textColor,
            fontSize: fontSize
          },
            textStyle
          ]}>
            {fileurl ? t('FileUploaded') : title}
          </Text>
        </View>

      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
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
  },
  iconStyle: {
    width: wp * 5 / 100,
    height: wp * 5 / 100,
    resizeMode: 'contain',
    marginHorizontal: wp * 2 / 100
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(13),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.black
  },
  heading2: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(20),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.red2
  },
});
