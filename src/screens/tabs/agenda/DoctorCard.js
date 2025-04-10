import React from 'react';
import { View, Text, Image } from 'react-native';
import { AgendaStyles } from './AgendaStyles';
import { Images } from '../../../assets';
import { ListingCard } from '../../../components/card';
const DoctorCard = ({ item }) => {
    return (
        <ListingCard customStyles={AgendaStyles.listItemContainer}>
            <View style={AgendaStyles.doctorItem}>
                <View style={AgendaStyles.doctorContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={AgendaStyles.doctorImage}
                    />
                </View>

                <View style={AgendaStyles.textContainer}>
                    <Text style={AgendaStyles.doctorName}>{item.name}</Text>
                    {item.mode === 'offline' ? (
                        <View style={AgendaStyles.addressContainer}>
                            <Image
                                source={Images.icon_map}
                                style={AgendaStyles.mapStyle}
                            />
                            <Text style={AgendaStyles.address}>{item.address}</Text>
                        </View>
                    ) : (
                        <View
                            style={[
                                AgendaStyles.modeButton,
                                {
                                    marginHorizontal: '0%',
                                    marginVertical: '1%',
                                },
                            ]}
                        >
                            <Text style={AgendaStyles.modeText}>{item.mode}</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={AgendaStyles.buttonContainer}>
                <View style={AgendaStyles.tabContainer}>
                    {item.availability.map((slot) => (
                        <View key={slot} style={AgendaStyles.tabButton}>
                            <Text style={AgendaStyles.tabText}>{slot}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ListingCard>
    );
};

export default DoctorCard;
