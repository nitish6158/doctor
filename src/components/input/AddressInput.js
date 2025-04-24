import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text ,TouchableOpacity,Image} from 'react-native';
import { Colors, Fonts, ResponsiveFont, WindowHeight as hp, WindowWidth as wp ,Images} from '../../assets';

export const AddressInput = ({
  placeholder,
  value,
  onChangeText,
  width = '95%',
  minHeight = hp * 0.09,
  borderRadius = 16,
  borderColor = Colors.borderColor2,
  textStyles = {},
  heading,
  autocapitalize = "words",
  containerstyle = {},
  editIcon = false,
}) => {
  const [height, setHeight] = useState(minHeight);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={containerstyle}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={[styles.heading, textStyles]}>{heading}</Text>
      <TouchableOpacity>
          <Image
            source={Images.editBlack}
            style={styles.editIcon}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.container,
          {
            // borderColor: borderColor,
            borderColor: isFocused ? Colors.blue : borderColor,
            borderTopWidth: isFocused ? 1 : 1,
            width,
            borderRadius,
            minHeight: height
          }]}>

        <TextInput
          style={[styles.input, { height }]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onContentSizeChange={(event) => setHeight(event.nativeEvent.contentSize.height + 10)}
          placeholderTextColor={Colors.placeholder_color}
          multiline
          autoCapitalize={autocapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    paddingHorizontal: wp * 2.5 / 100,
    marginVertical: hp * 0.5 / 100,
    paddingVertical: wp * 3.4 / 100,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  input: {
    fontSize: ResponsiveFont(14),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(13),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.black,
  },
  editIcon: {
    width: wp * 5 / 100,
    height: wp * 5 / 100
  },
});
