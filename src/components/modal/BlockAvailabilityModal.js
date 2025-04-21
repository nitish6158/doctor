import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, } from 'react-native';
import { Images, Colors, WindowWidth as wp, WindowHeight as hp, Fonts, ResponsiveFont } from '../../assets';
import { ToastMsg } from '../Toast';
import { ListingCard } from '../card';
import { CustomTimeInput, AddressInput, TimePicker, CustomDateInput } from '../input';
import { CustomButton } from '../button';
import { useTranslation } from '../customhooks';
export const BlockAvailabilityModal = ({
    visible,
    onCloseBlockAvailabilityModal,
    isBlockByDate,
    setIsBlockByDate,
    formatDateDDMMYYYY,
    selectedBlockStartDate,
    setSelectedBlockStartDate,
    selectedBlockEndDate,
    setSelectedBlockEndDate,
    blockStartTime,
    setBlockStartTime,
    setBlockEndTime,
    blockEndTime,
    reason,
    setReason,
    handleBlockDate,
    onBlockPress,

}) => {

    const t = useTranslation();

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onCloseBlockAvailabilityModal}
        >
            <View style={styles.overlay}>

                <TouchableOpacity style={styles.closeButton} onPress={onCloseBlockAvailabilityModal}>
                    <Image source={Images.icon_cross} style={styles.iconClose} />
                </TouchableOpacity>

                <View style={styles.modal}>
                    <Text style={styles.title}>{t('BlockAvailability')}</Text>

                    <View style={styles.modeContainer3}>
                        <TouchableOpacity
                            style={[styles.modeButton3, {
                                marginHorizontal: '0%',
                                backgroundColor: isBlockByDate ? Colors.blue : Colors.white
                            }]}
                            onPress={() => { setIsBlockByDate(true) }}

                        >
                            <Text
                                style={[styles.modeText2,
                                { color: isBlockByDate ? Colors.white : Colors.blue }]}
                            >{t('BlockByDate')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modeButton3, {
                                backgroundColor: isBlockByDate ? Colors.white : Colors.blue
                            }]}
                            onPress={() => { setIsBlockByDate(false) }}
                        >
                            <Text
                                style={[styles.modeText2, {
                                    color: isBlockByDate ?
                                        Colors.blue :
                                        Colors.white
                                }]}
                            >{t('BlockByTime')}</Text>
                        </TouchableOpacity>
                    </View>
                    {isBlockByDate ?
                        <View style={styles.startEndDateContainer}>
                            <CustomDateInput
                                placeholder="From Date"
                                value={selectedBlockStartDate}
                                onDateChange={setSelectedBlockStartDate}
                                minimumDate={new Date()} // optional
                                icon="calender"
                            />

                            <CustomDateInput
                                placeholder="To Date"
                                value={selectedBlockEndDate}
                                onDateChange={setSelectedBlockEndDate}
                                minimumDate={new Date()} // optional
                                icon="calender"
                            />

                        </View>
                        :
                        <>
                            <CustomDateInput
                                placeholder={formatDateDDMMYYYY}
                                icon="calender"
                                width="95%"
                                marginVertical="2%"
                                value={selectedBlockStartDate}
                                onDateChange={setSelectedBlockStartDate}
                                paddingVertical='1.5%'
                                minimumDate={new Date()}
                            />
                            <View style={styles.startEndDateContainer}>
                                <TimePicker
                                    value={blockStartTime}
                                    onChange={(time) => {
                                        setBlockStartTime(time)
                                    }}
                                    label="From Time"
                                />
                                <TimePicker
                                    value={blockEndTime}
                                    onChange={(time) => {
                                        setBlockEndTime(time)
                                    }}
                                    label="To Time"
                                    minTime={blockStartTime}
                                />
                            </View>
                        </>
                    }
                    <View style={styles.addressContainer3}>
                        <AddressInput
                            heading='Reason'
                            placeholder='Enter Reason'
                            value={reason}
                            onChangeText={setReason}
                            width='100%'
                            autocapitalize={"sentences"}
                        />
                    </View>
                    <View
                        style={styles.BlockButtonContainer}
                    >
                        <CustomButton
                            title={"Block Availability"}
                            width='94%'
                            onPress={() => {
                                if (isBlockByDate) {
                                    handleBlockDate()
                                } else {
                                    onBlockPress()
                                }

                            }}
                        />
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: Colors.shadow
    },
    BlockButtonContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modal: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: '8%',
        borderTopRightRadius: '8%',
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        alignItems: 'center'
    },
    closeButton: {
        alignSelf: 'center',
        marginBottom: '2%',
        backgroundColor: Colors.white,
        padding: '4%',
        borderRadius: '50%',

    },
    addressContainer3: {
        paddingVertical: '2%',
        width: '93%',
        marginVertical: '2%'

    },
    modeButton3: {
        paddingVertical: '3%',
        marginHorizontal: '2%',
        borderRadius: (wp * 2) / 100,
        borderColor: Colors.blue,
        borderWidth: 1,
        backgroundColor: Colors.white,
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeText2: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(12),
        lineHeight: ResponsiveFont(15),
        color: Colors.blue,
    },
    startEndDateContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '3%'
    },
    BlockedContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%'
    },
    BlockAvailabiltyIcon: {
        width: wp * 16 / 100,
        height: wp * 16 / 100,
        resizeMode: 'contain'
    },
    iconClose: {
        width: wp * 5 / 100,
        height: wp * 5 / 100,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 15,
    },
    modeContainer3: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // padding: '3%'
        // backgroundColor:'green',
        marginVertical: '3.5%'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginBottom: 10,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    listingCard: {
        width: wp * 90 / 100,
        alignSelf: 'center',
        paddingHorizontal: '4%'
    },
    modeContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: '3%',
    },
    modeButton: {
        paddingVertical: '1%',
        marginHorizontal: '2%',
        borderRadius: (wp * 2) / 100,
        borderColor: Colors.blue,
        borderWidth: 1,
        backgroundColor: Colors.white,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeText: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(17),
        color: Colors.blue,
    },
    slotContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: '1%',
        justifyContent: 'space-between',
    },
    addressContainer4: {
        // flexDirection: 'row',
        // backgroundColor:'red'
        marginVertical: '3%',
        width: '100%'
    },

});

