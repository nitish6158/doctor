import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ResponsiveFont, Colors, Fonts, WindowWidth as wp } from '../../assets';

export const ToggleButton = ({
    isActive = true, // Controlled state from parent
    onToggle = () => { },
    leftText = "My Availability",
    rightText = "Team Availability",
}) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => !isActive && onToggle(true)}
                style={[
                    styles.button,
                    { backgroundColor: isActive ? Colors.blue : Colors.white }
                ]}
            >
                <Text style={[
                    styles.text,
                    { color: isActive ? Colors.white : Colors.black }
                ]}>
                    {leftText}
                </Text>
            </Pressable>
            <Pressable
                onPress={() => isActive && onToggle(false)}
                style={[
                    styles.button,
                    { backgroundColor: isActive ? Colors.white : Colors.blue }
                ]}
            >
                <Text style={[
                    styles.text,
                    { color: isActive ? Colors.black : Colors.white }
                ]}>
                    {rightText}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        width: '90%',
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: Colors.blue,
        paddingVertical: wp * 0.9 / 100,

    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: wp * 3.5 / 100,
        borderRadius: 15,
        marginHorizontal:"1%",
    },
    text: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(14),
    },
});
