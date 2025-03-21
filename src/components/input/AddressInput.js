import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Colors, Fonts, ResponsiveFont, WindowHeight as hp, WindowWidth as wp } from '../../assets';

export const AddressInput = ({
  placeholder,
  value,
  onChangeText,
  width = '95%',
  minHeight = hp * 0.09,
  borderRadius = 16,
  borderColor=Colors.borderColor2,
  textStyles = {},
  heading
}) => {
  const [height, setHeight] = useState(minHeight);

  return (
    <View>
      <Text style={[styles.heading, textStyles]}>{heading}</Text>
      <View style={[styles.container, { borderColor: borderColor, width, borderRadius, minHeight: height }]}> 
        <TextInput
          style={[styles.input, { height }]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onContentSizeChange={(event) => setHeight(event.nativeEvent.contentSize.height + 10)}
          placeholderTextColor={Colors.placeholder_color}
          multiline
          autoCapitalize='words'
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
    paddingVertical:wp*3.4/100,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  input: {
    fontSize: ResponsiveFont(16),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: ResponsiveFont(14),
    lineHeight: ResponsiveFont(17.5),
    color: Colors.black,
  },
});
