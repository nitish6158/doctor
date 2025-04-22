import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ResponsiveFont, Colors, Fonts, WindowWidth as wp } from '../../assets';

export const MultiStepToggle = ({
    currentStep = 0, // Index of selected step
    onToggle = () => { },
    steps = ["Step 1", "Step 2", "Step 3", "Step 4"],
    width = '100%',
}) => {
    return (
        <View style={[styles.container, { width }]}>
            {steps.map((label, index) => (
                <Pressable
                    key={index}
                    onPress={() => currentStep !== index && onToggle(index)}
                    style={[
                        styles.button,
                        {
                            backgroundColor: currentStep === index ? Colors.blue : Colors.white,
                            flex: 1 / steps.length,
                        }
                    ]}
                >
                    <Text style={[
                        styles.text,
                        { color: currentStep === index ? Colors.white : Colors.black }
                    ]}>
                        {label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: Colors.blue,
        paddingVertical: wp * 0.9 / 100,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: wp * 3.5 / 100,
        // paddingVertical: wp * 2 / 100,
        borderRadius: 15,
        marginHorizontal: "1%",
    },
    text: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(12),
        textAlign: 'center',
    },
});
