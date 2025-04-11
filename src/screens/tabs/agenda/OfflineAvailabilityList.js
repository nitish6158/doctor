import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Images, Colors } from '../../../assets';
import { AgendaStyles } from './AgendaStyles';
import { ListingCard } from '../../../components/card';
// export const OfflineAvailabilityList = ({ myAvailabilityData,selectedSlot, setSelectedSlot }) => {
//     return (
//         <FlatList
//             data={myAvailabilityData?.offlineSlots || []}
//             keyExtractor={(item) => item.clinicId}
//             renderItem={({ item }) => (
//                 <ListingCard customStyles={[AgendaStyles.card, {
//                     alignSelf: 'center', width: '95%'
//                 }]}>
//                     <View style={AgendaStyles.availabilityCard}>
//                         <View style={AgendaStyles.availabilityinfo}>
//                             <Text style={AgendaStyles.date}>{myAvailabilityData?.date}</Text>
//                             <View style={AgendaStyles.modeButton}>
//                                 <Text style={AgendaStyles.modeText}>Offline</Text>
//                             </View>
//                         </View>

//                         <View style={AgendaStyles.tabContainer}>
//                             {item.timeSlots?.map((slot, index) => (
//                                 <View key={index} style={AgendaStyles.tabButton}>
//                                     <Text style={AgendaStyles.tabText}>
//                                         {slot.startTime}-{slot.endTime}
//                                     </Text>
//                                 </View>
//                             ))}
//                         </View>

//                         {item.clinicName && item.clinicName != "" &&
//                             <Text style={AgendaStyles.address2}>{item.clinicName}</Text>
//                         }
//                         {item.address && item.address != "" &&
//                             <View style={AgendaStyles.addressContainer2}>
//                                 <Image source={Images.icon_map} style={AgendaStyles.iconStyle3} />
//                                 <Text style={AgendaStyles.address2}>{item?.address}</Text>
//                             </View>
//                         }

//                         <View style={AgendaStyles.AvailalitytbuttonContainer}>
//                             <TouchableOpacity style={AgendaStyles.deleteButtonContainer}>
//                                 <Image source={Images.icon_delete}
//                                     style={AgendaStyles.iconStyle3} />
//                             </TouchableOpacity>
//                             <TouchableOpacity style={AgendaStyles.editButtonContainer}>
//                                 <Text style={AgendaStyles.text}>Edit</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </ListingCard>
//             )}
//             scrollEnabled={false}
//             showsVerticalScrollIndicator={false}
//         />
//     );
// };



export const OfflineAvailabilityList = (
    {
        myAvailabilityData,
        selectedSlot,
        setSelectedSlot,
        onDeletePress,
        onEditPress
    }) => {
    return (
        <FlatList
            data={myAvailabilityData?.offlineSlots || []}
            keyExtractor={(item) => item.clinicId}
            renderItem={({ item }) => (
                <ListingCard customStyles={[AgendaStyles.card,
                { alignSelf: 'center', width: '95%' }]}>
                    <View style={AgendaStyles.availabilityCard}>
                        <View style={AgendaStyles.availabilityinfo}>
                            <Text style={AgendaStyles.date}>{
                                myAvailabilityData?.date}</Text>
                            <View style={AgendaStyles.modeButton}>
                                <Text style={AgendaStyles.modeText}>Offline</Text>
                            </View>
                        </View>
                        <View style={AgendaStyles.tabContainer}>
                            {item.timeSlots?.map((slot, index) => {
                                const isSelected = selectedSlot &&
                                    selectedSlot.startTime === slot.startTime &&
                                    selectedSlot.clinicId === item.clinicId &&
                                    selectedSlot.mode === 'offline';
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            AgendaStyles.tabButton,
                                            isSelected && { backgroundColor: Colors.lightblue3 }
                                        ]}
                                        onPress={() => {
                                            setSelectedSlot({
                                                mode: 'offline',
                                                clinicId: item.clinicId,
                                                startTime: slot.startTime,
                                                endTime: slot.endTime,
                                                timeSlotId: slot.id,
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
                        {item.clinicName && item.clinicName != "" && <Text style={AgendaStyles.address2}>{item.clinicName}</Text>}
                        <View style={AgendaStyles.AvailalitytbuttonContainer}>
                            <TouchableOpacity
                                style={AgendaStyles.deleteButtonContainer}
                                onPress={onDeletePress}

                            >
                                <Image source={Images.icon_delete} style={AgendaStyles.iconStyle3} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={AgendaStyles.editButtonContainer}
                                onPress={onEditPress}

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
