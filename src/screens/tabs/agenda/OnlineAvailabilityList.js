import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Images } from '../../../assets';
import { AgendaStyles } from './AgendaStyles';
import { ListingCard } from '../../../components/card';
export const OnlineAvailabilityList = ({ myAvailabilityData }) => {
    return (
        <FlatList
            data={myAvailabilityData?.onlineSlots || []}
            keyExtractor={(item) => item.clinicId}
            renderItem={({ item }) => (
                <ListingCard customStyles={[AgendaStyles.card, {
                    alignSelf: 'center', width: '95%'
                }]}>
                    <View style={AgendaStyles.availabilityCard}>
                        <View style={AgendaStyles.availabilityinfo}>
                            <Text style={AgendaStyles.date}>{myAvailabilityData?.date}</Text>
                            <View style={AgendaStyles.modeButton}>
                                <Text style={AgendaStyles.modeText}>Online</Text>
                            </View>
                        </View>
                        <View style={AgendaStyles.tabContainer}>
                            {item.timeSlots?.map((slot, index) => (
                                <View key={index} style={AgendaStyles.tabButton}>
                                    <Text style={AgendaStyles.tabText}>
                                        {slot.startTime}-{slot.endTime}
                                    </Text>
                                </View>
                            ))}
                        </View>
                       {item.clinicName && item.clinicName != "" &&  <Text style={AgendaStyles.address2}>{item.clinicName}</Text>}
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


// <ListingCard
//     customStyles={AgendaStyles.card}>
//     <View style={AgendaStyles.availabilityCard}>
//         <View style={AgendaStyles.availabilityinfo}>
//             <Text style={AgendaStyles.date}>{props.myAvailabilityData?.date}</Text>
//             <View
//                 style={AgendaStyles.modeButton}
//             >
//                 <Text style={AgendaStyles.modeText}>Online</Text>
//             </View>
//         </View>
//         <View style={AgendaStyles.tabContainer}>
//             {props.myAvailabilityData?.onlineSlots?.map((slot, index) => (
//                 <View
//                     key={index}
//                     style={AgendaStyles.tabButton}
//                 >
//                     <Text
//                         style={
//                             AgendaStyles.tabText
//                         }>
//                         {slot?.startTime}-{slot?.endTime}
//                     </Text>
//                 </View>
//             ))}
//         </View >

//         <View style={AgendaStyles.AvailalitytbuttonContainer}>
//             <TouchableOpacity style={AgendaStyles.deleteButtonContainer}>
//                 <Image
//                     source={Images.icon_delete}
//                     style={AgendaStyles.iconStyle3}
//                 />
//             </TouchableOpacity>
//             <TouchableOpacity style={AgendaStyles.editButtonContainer}>
//                 <Text style={AgendaStyles.text}>Edit</Text>
//             </TouchableOpacity>
//         </View>
//     </View>
// </ListingCard>