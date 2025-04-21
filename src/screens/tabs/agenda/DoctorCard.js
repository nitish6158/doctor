import React from 'react';
import { View, Text, Image } from 'react-native';
import { AgendaStyles } from './AgendaStyles';
import { Colors, Images } from '../../../assets';
import { ListingCard } from '../../../components/card';
import { useTranslation } from '../../../components/customhooks';
const DoctorCard = ({ item }) => {
    const t=useTranslation();
    return (
        <ListingCard customStyles={AgendaStyles.listItemContainer}>
            <View style={AgendaStyles.doctorItem}>
                <View style={AgendaStyles.doctorContainer}>
                    <Image
                        source={
                            item?.profilePicture ?
                                { uri: item.image }
                                :
                                Images.icon_user_doctor_active
                        }
                        style={AgendaStyles.doctorImage}
                    />
                </View>
                <View style={AgendaStyles.textContainer}>
                    <Text style={AgendaStyles.doctorName}>{item.doctorName}</Text>
                    <View style={AgendaStyles.addressContainer5}>
                        <Image
                            source={Images.dotOnline}
                            style={AgendaStyles.mapStyle3}
                            resizeMode='contain'

                        />
                        <Text style={[AgendaStyles.dotName, { marginLeft: '3%', color: Colors.blue }]}>{t('Online')}</Text>
                        <View style={AgendaStyles.dotContainer}>
                            <Image
                                source={Images.dotOffline}
                                style={AgendaStyles.mapStyle3}
                                resizeMode='contain'
                            />
                            <Text style={AgendaStyles.dotName}>{t('Offline')}</Text>
                        </View>

                    </View>
                </View>
            </View>

            <View style={AgendaStyles.buttonContainer4}>
                <View style={AgendaStyles.tabContainer3}>
                    {item?.slotResponseList?.map((slot) => (
                        <View key={slot.timeSlotId} style={[AgendaStyles.tabButton5, {
                            borderColor: slot.type == 'online' ? Colors.blue : Colors.light_gray2
                        }]}>
                            <Text style={AgendaStyles.tabText}>{slot.fromTime + "-" + slot.toTime}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ListingCard>
    );
};

export default DoctorCard;
