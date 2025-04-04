import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Images } from '../../../assets';
import { AgendaStyles } from './AgendaStyles';
import { ListingCard } from '../../../components/card';
export const OfflineAvailabilityList = ({ myAvailabilityData }) => {
    return (
            <FlatList
                data={myAvailabilityData?.offlineSlots || []}
                keyExtractor={(item) => item.clinicId}
                renderItem={({ item }) => (
                    <ListingCard customStyles={[AgendaStyles.card,{ 
                        alignSelf:'center' ,width:'95%'}]}>
                        <View style={AgendaStyles.availabilityCard}>
                            <View style={AgendaStyles.availabilityinfo}>
                                <Text style={AgendaStyles.date}>{myAvailabilityData?.date}</Text>
                                <View style={AgendaStyles.modeButton}>
                                    <Text style={AgendaStyles.modeText}>Offline</Text>
                                </View>
                            </View>

                            <View style={AgendaStyles.tabContainer}>
                                {item.clinicSlots?.map((slot, index) => (
                                    <View key={index} style={AgendaStyles.tabButton}>
                                        <Text style={AgendaStyles.tabText}>
                                            {slot.startTime}-{slot.endTime}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <Text style={AgendaStyles.address2}>{item.clinicName}</Text>

                            <View style={AgendaStyles.addressContainer2}>
                                <Image source={Images.icon_map} style={AgendaStyles.iconStyle3} />
                                <Text style={AgendaStyles.address2}>{item.address}</Text>
                            </View>

                            <View style={AgendaStyles.AvailalitytbuttonContainer}>
                                <TouchableOpacity style={AgendaStyles.deleteButtonContainer}>
                                    <Image source={Images.icon_delete} style={AgendaStyles.iconStyle3} />
                                </TouchableOpacity>
                                <TouchableOpacity style={AgendaStyles.editButtonContainer}>
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

