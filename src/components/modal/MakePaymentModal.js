import React from 'react';
import { Text, TouchableOpacity, Pressable, StyleSheet, Modal, Image, View } from 'react-native';
import { Colors, Fonts, Images, WindowWidth as wp, ResponsiveFont, WindowHeight as hp, opacityOfButton } from '../../assets';

export const MakePaymentModal = ({
    heading = 'make payment',
    isModalOpen = false,
    onClose,
    handleOnpress,
}) => {
    return (
        <Modal
            visible={isModalOpen}
            transparent={true}
            animationType='fade'
            onRequestClose={
                onClose
            } >
            <View style={
                styles.modalmainView}>
                <Pressable
                    style={styles.presableView}
                    onPress={onClose}
                >
                    <Image
                        source={
                            Images.makepayment
                        }
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={styles.heading}>
                        {heading}
                    </Text>
                    <TouchableOpacity
                        onPress={handleOnpress}
                        style={styles.topView}>
                        <Text style={styles.heading1}>make payment</Text>
                    </TouchableOpacity>
                </Pressable>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalmainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.shadow
    },
    presableView: {
        width: '95%',
        backgroundColor: Colors.white,
        borderRadius: (wp * 8) / 100,
        alignItems: 'center',
        // flex:6
        paddingVertical: wp * 4 / 100,
        // paddingVertical: (wp * 15) / 100
    },
    topView: {
        backgroundColor: Colors.lightblue3,
        width: wp * 45 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (wp * 4) / 100,
        paddingVertical: wp * 1 / 100,
        marginTop: wp * 3 / 100,
    },
    image: {
        width: (wp * 75) / 100,
        height: (wp * 55) / 100,
        resizeMode: 'contain'
    },
    heading: {
        fontSize: ResponsiveFont(20),
        color: Colors.black,
        fontFamily: Fonts.Bold,
        textAlign: 'center'
    },
    heading1: {
        fontSize: ResponsiveFont(20),
        color: Colors.blue,
        fontFamily: Fonts.Bold,
        textAlign: 'center',
    }
});

