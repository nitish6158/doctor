import React from 'react';
import { Text, Pressable, StyleSheet, Modal, Image, View, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Images, WindowWidth as wp, ResponsiveFont, WindowHeight as hp, opacityOfButton } from '../../assets';
import { CustomButton } from '../button';

export const BankModal = ({
    buttonText = 'Add Bank Details',
    subHeading = 'You have not added your bank details',
    isModalOpen = false,
    onClose,
    buttonOnpress,
}) => {
    return (
        <Modal
            visible={isModalOpen}
            transparent={true}
            animationType='fade'
            onRequestClose={
                onClose
            }
        >
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.blue
            }}>
                <View style={{
                    width: '75%',
                    height: '30%',
                    backgroundColor: Colors.white,
                    borderRadius: (wp * 8) / 100,
                    alignItems: 'center',
                    justifyContent: 'center'

                }}
                >
                    {/* <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'flex-end',
                        backgroundColor:'red'
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '30%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: '5%',
                                borderRadius: 10,
                                borderColor: Colors.light_gray4,
                            }}
                            onPress={onClose}
                        >
                            <Text style={{
                                fontSize: ResponsiveFont(20),
                                lineHeight: ResponsiveFont(25),
                                color: Colors.black,
                                fontFamily: Fonts.Bold,
                                marginVertical: (wp * 2) / 100
                            }}>Skip</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={{
                        backgroundColor: Colors.shadowBlue,
                        width: wp * 25 / 100,
                        height: (wp * 25) / 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: (wp * 14) / 100
                    }}>
                        <Image
                            source={Images.handshake}
                            style={styles.cardImage}
                        />

                    </View>

                    <Text style={styles.headingcontainer}>{subHeading}</Text>

                    <TouchableOpacity
                        onPress={buttonOnpress}
                        style={{
                            width: '65%',
                            // height: '18%',
                            paddingVertical:'1%',
                            backgroundColor: Colors.blue,
                            borderRadius: 22,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            fontSize: ResponsiveFont(16),
                            lineHeight: ResponsiveFont(25),
                            color: Colors.white,
                            fontFamily: Fonts.Bold,
                            marginVertical: '2%',
                            textAlign: 'center'
                        }}>Add Bank Details</Text>
                    </TouchableOpacity>
                    {/* <CustomButton
                        title={buttonText}
                        onPress={buttonOnpress}
                        backgroundColor={Colors.blue}
                        textColor={Colors.white}
                        width='65%'
                        height={'18%'}
                    /> */}

                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    cardImage: {
        width: wp * 30 / 100,
        height: wp * 30 / 100,
        resizeMode: 'contain'
    },
    headingcontainer: {
        fontSize: ResponsiveFont(20),
        lineHeight: ResponsiveFont(25),
        color: Colors.black,
        fontFamily: Fonts.Bold,
        marginVertical: '2%',
        width: '75%',
        textAlign: 'center'
    },
});

