import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Images, Colors } from '../../../assets';
import { AgendaStyles } from './AgendaStyles';
import { ListingCard } from '../../../components/card';
import { ToastMsg } from '../../../components/Toast';
export const AvailabilityList = ({
    type, // 'online' or 'offline'
    slots,
    date,
    selectedSlot,
    setSelectedSlot,
    onDeletePress,
    onEditPress,
    onRestorePress,
}) => {
    return (
        <FlatList
            data={slots || []}
            keyExtractor={(item, index) => `${item.clinicId}_${index}`}
            renderItem={({ item }) => (
                <ListingCard customStyles={[AgendaStyles.card, { alignSelf: 'center', width: '95%', padding: '0%', }]}>
                    <View style={AgendaStyles.availabilityCard}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <View style={AgendaStyles.availabilityinfo}>
                                <Text style={AgendaStyles.date}>{date}</Text>
                                <View style={AgendaStyles.modeButton}>
                                    <Text style={AgendaStyles.modeText}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={AgendaStyles.restoreButton}
                                onPress={() => {

                                    const slotToRestore = selectedSlot?.clinicId === item.clinicId
                                     && selectedSlot?.mode === type
                                        ? selectedSlot
                                        : null;

                                    if (slotToRestore) {
                                        onRestorePress(slotToRestore); // Pass full slot info for accuracy
                                    } else {
                                        ToastMsg("Please select a slot from this card to Restore.", "bottom");
                                    }
                                }}
                            >
                                <Text
                                    style={AgendaStyles.restoreText}
                                >Restore</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={AgendaStyles.tabContainer}>
                            {item.timeSlots?.map((slot, index) => {
                                const isSelected = selectedSlot &&
                                    selectedSlot.startTime === slot.startTime &&
                                    selectedSlot.clinicId === item.clinicId &&
                                    selectedSlot.mode === type;

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        // style={[
                                        //     AgendaStyles.tabButton,
                                        //     slot.isBlockedByDay || slot.isBlockedByIndividual && { backgroundColor: Colors.red4 },
                                        //     isSelected && { backgroundColor: Colors.lightblue3 }

                                        // ]}
                                        style={[AgendaStyles.tabButton,
                                        {
                                            backgroundColor: slot.isBlockedByTime || slot.isBlockedByIndividual ?
                                                Colors.red4 :
                                                isSelected ? Colors.lightblue3 : Colors.shadowBlue,
                                        }

                                        ]}
                                        onPress={() => {
                                            setSelectedSlot({
                                                mode: type,
                                                clinicId: item.clinicId,
                                                startTime: slot.startTime,
                                                endTime: slot.endTime,
                                                timeSlotId: slot.id,
                                                date: date,
                                            });
                                        }}
                                    >
                                        <Text style={AgendaStyles.tabText}>
                                            {slot.startTime}-{slot.endTime}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {item.clinicName && item.clinicName !== "" && (
                            <Text style={AgendaStyles.address2}>{item.clinicName}</Text>
                        )}

                        <View style={AgendaStyles.AvailalitytbuttonContainer}>
                            <TouchableOpacity
                                style={AgendaStyles.deleteButtonContainer}
                                onPress={() => {
                                    const slotToDelete = selectedSlot?.clinicId === item.clinicId && selectedSlot?.mode === type
                                        ? selectedSlot
                                        : null;

                                    if (slotToDelete) {
                                        onDeletePress(slotToDelete); // Pass full slot info for accuracy
                                    } else {
                                        ToastMsg("Please select a slot from this card to delete.", "bottom");
                                    }
                                }}
                            >
                                <Image source={Images.icon_delete} style={AgendaStyles.iconStyle3} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={AgendaStyles.editButtonContainer}
                                onPress={() => {
                                    const slotToEdit = selectedSlot?.clinicId === item.clinicId && selectedSlot?.mode === type
                                        ? selectedSlot
                                        : null;

                                    if (slotToEdit) {
                                        onEditPress({
                                            ...slotToEdit,
                                            location: item.clinicName,
                                        });
                                    } else {
                                        ToastMsg("Please select a slot from this card to edit.", "bottom");
                                    }
                                }}
                            >
                                <Text style={AgendaStyles.text}>Edit</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ListingCard>
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
        />
    );
};

