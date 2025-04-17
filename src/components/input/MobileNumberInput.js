import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import {
    Colors,
    Fonts,
    ResponsiveFont,
    WindowHeight as hp,
    WindowWidth as wp,
    Images
} from '../../assets';
import { CustomDropdown } from '../dropdown';
export const MobileNumberInput = ({
    heading,
    value,
    onChangePhone,
    selectedCode,
    onChangeCode,
    countries = [],
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const getMaxLength = () => {
        switch (selectedCode?.code) {
            case '+966': return 9;  // Saudi
            case '+971': return 9;  // UAE
            case '+33': return 9;  // France
            case '+91': return 10; // India
            case '+49': return 11; // Germany (max length of mobile numbers)
            case '+44': return 10; // UK
            default: return 15; // Fallback
        }
    };



    return (
        <View style={{ marginVertical: '2%' }}>
            <Text style={styles.heading}>{heading}</Text>

            <View style={[styles.container, {
                borderColor: isFocused ? Colors.blue : Colors.borderColor2,
            }]}>
                {/* Country Code Dropdown */}
                <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center', }}>
                    <CustomDropdown
                        heading={''}
                        placeholder={"Select"}
                        options={countries}
                        selectedValue={selectedCode}
                        onValueChange={(newVal) => {
                            onChangeCode(newVal);
                        }}
                        type="phone"
                        width="100%"
                        borderRadius={10}
                        // style={{ borderRightWidth: 1, borderColor: Colors.borderColor2 }}
                        textStyle={{ fontSize: ResponsiveFont(14) }}
                        containerstyle={{ marginBottom: 1 }}
                    />
                </View>

                {/* Mobile Number Input */}
                <View style={styles.inputContainer}>
                    <Image
                        source={isFocused || value ? Images.icon_mobile_active : Images.icon_mobile_deactive}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Number"
                        placeholderTextColor={Colors.placeholder_color}
                        value={value}
                        onChangeText={onChangePhone}
                        keyboardType="phone-pad"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        maxLength={getMaxLength()}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(13),
        color: Colors.black,
        marginBottom: 4,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 16,
        height: hp * 0.07,
        overflow: 'hidden',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp * 2 / 100,
        flex: 1,
    },
    input: {
        flex: 1,
        fontSize: ResponsiveFont(14),
        fontFamily: Fonts.Regular,
        color: Colors.black,
    },
    icon: {
        width: (wp * 4.6) / 100,
        height: (wp * 4.6) / 100,
        resizeMode: 'contain',
        marginRight: wp * 2 / 100,
    },
});

