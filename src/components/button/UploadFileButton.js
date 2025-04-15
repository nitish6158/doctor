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
  fileurl = null
}) => {
  const t = useTranslation()
  return (
    <View style={{ marginVertical: '2%' }}>
      <Text style={styles.heading}>{heading}</Text>
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
          {!fileurl && <Image
            source={Images.icon_upload}
            style={styles.iconStyle}
          />}
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
    width: wp * 6 / 100,
    height: wp * 6 / 100,
    resizeMode: 'contain',
    marginHorizontal: wp * 1 / 100
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(14),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.black
  }
});
