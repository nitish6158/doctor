import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts, ResponsiveFont, WindowHeight as hp, WindowWidth as wp } from '../../assets';
import { Images } from '../../assets/Images';

export const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  type = 'text', // 'email', 'password', 'phone', 'text','userName'
  width = '95%',
  height = hp * 0.07,
  borderRadius = 16,
  borderColor = Colors.borderColor2,
  textStyles = {},
  heading
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(type === 'password' ? true : false); // Default: true for password

  const getIcons = () => {
    switch (type) {
      case 'userName':
        return isFocused || value ? Images.user_icon_active : Images.user_icon_deactive;
      case 'email':
        return isFocused || value ? Images.icon_email_active : Images.icon_email_deactive;
      case 'password':
        return isFocused || value ? Images.icon_lock_active : Images.icon_lock_deactive;
      case 'phone':
        return isFocused || value ? Images.icon_mobile_active : Images.icon_mobile_deactive;
      case 'text':
        return isFocused || value ? Images.user_icon_active : Images.user_icon_deactive;
      default:
        return isFocused || value ? Images.user_icon_active : Images.user_icon_deactive;
    }
  };

  return (
    <View style={{ marginVertical: '2%' }}>
      <Text style={[styles.heading, { textStyles }]}>{heading}</Text>
      <View style={[styles.container,
      {
        borderColor: isFocused ? Colors.blue : borderColor,
        borderTopWidth: isFocused ? 1 : 0,
        width,
        height,
        borderRadius
      }]}>
        <Image source={getIcons()} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureText} // Toggling based on state
          onChangeText={onChangeText}
          keyboardType={type === 'phone' ? 'phone-pad' : type === 'email' ? 'email-address' : 'default'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.placeholder_color}
          autoCapitalize={
            type === 'email' || type === 'userName' ? 'none' : 'sentences'
          }
        />
        {type === 'password' && (
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image
              source={secureText ? Images.icon_eye_close : Images.icon_eye_open} // Toggle icons
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: wp * 2.5 / 100,
    marginVertical: hp * 0.5 / 100,
  },
  icon: {
    width: (wp * 4.6) / 100,
    height: (wp * 4.6) / 100,
    marginRight: wp * 2.5 / 100,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: ResponsiveFont(16),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(14),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.black
  },
  eyeIcon:{
    width: (wp * 4.6) / 100,
    height: (wp * 4.6) / 100,
    resizeMode: 'contain',
  }
});


