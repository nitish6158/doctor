import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Image,
}from "react-native";
import { AppointmentStyles } from './AppointmentStyles';
import {
    Images,
    Colors,
    WindowHeight as hp,
    Fonts,
    ResponsiveFont
} from '../../../assets';
import { FloatingBackgroundCard } from '../../../components/card';
import { ListingCard } from '../../../components/card';
import { CustomButton } from '../../../components/button';
import { useTranslation } from '../../../components/customhooks';
const tabs = [
    "Upcoming",
    "Completed",
    "Expired",
    "Cancelled By Me",
    "Cancelled By Patient",
];

const appointments = [
    {
        id: "1fg",
        name: "Sara Williams 33 Central Ave",
        profileImage: Images.doctor3,
        appointmentTime: "Today | 10:00 PM day ",
        address: "1233 Central Ave, Lake Stats",
        startTime: "12:30 PM",
        endTime: "1:30 PM",
    },

    {
        id: "2fgfdgdr",
        name: "Sara Williams",
        profileImage: Images.doctor3,
        appointmentTime: "Today | 10:00 PM",
        address: "1233 Central Ave, Lake Stats...",
        startTime: "12:30 PM",
        endTime: "1:30 PM",
    },

    {
        id: "3gdfg",
        name: "Sara Williams",
        profileImage: Images.doctor3,
        appointmentTime: "Today | 10:00 PM",
        address: "1233 Central Ave, Lake Stats...",
        startTime: "12:30 PM",
        endTime: "1:30 PM",
    },

    {
        id: "4gfgd",
        name: "Sara Williams",
        profileImage: Images.doctor3,
        appointmentTime: "Today | 10:00 PM",
        address: "1233 Central Ave, Lake Stats...",
        startTime: "12:30 PM",
        endTime: "1:30 PM",
    },

    {
        id: "5fggdfg",
        name: "Sara Williams",
        profileImage: Images.doctor3,
        appointmentTime: "Today | 10:00 PM",
        address: "1233 Central Ave, Lake Stats...",
        startTime: "12:30 PM",
        endTime: "1:30 PM",
    },

    {
        id: "6gfgdfgrd",
        name: "Sara Williams",
        profileImage: Images.doctor3,
        appointmentTime: "Today | 10:00 PM",
        address: "1233 Central Ave, Lake Stats...",
        startTime: "12:30 PM",
        endTime: "1:30 PM",
    },

];

const AppointmentScreen = () => {
    const t=useTranslation();
    const [selectedTab, setSelectedTab] = useState("Completed");

    const renderItem = ({ item }) => (
        <ListingCard>
            <View style={AppointmentStyles.detailContainer}>
                <View style={AppointmentStyles.imageContainer}>
                    <Image
                        source={item.profileImage}
                        style={AppointmentStyles.cardImage}
                    />
                </View>
                <View style={AppointmentStyles.details}>
                    <Text style={AppointmentStyles.Name}>{item.name}</Text>
                    <Text style={AppointmentStyles.id}>{item.id}</Text>
                    <Text style={AppointmentStyles.id}>{item.appointmentTime}</Text>
                    <View style={AppointmentStyles.addressContainer}>
                        <Image source={Images.icon_map} style={AppointmentStyles.mapIcon}/>
                        <Text style={[AppointmentStyles.Name, { marginLeft: '2%', width:'100%'}]}>{item.address}</Text>
                    </View>
                </View>
            </View>
            <View style={AppointmentStyles.buttonContainer}>
                <CustomButton
                    title={t('Cancel')}
                    // onPress={() => { }}
                    backgroundColor={Colors.orange}
                    textColor={Colors.white}
                    height={hp * 0.04}
                    width={"40%"}
                    textStyle={cancelButtonTextStyle}
                />
                <CustomButton
                    title={t('Join')}
                    // onPress={() => { }}
                    backgroundColor={Colors.blue}
                    textColor={Colors.white}
                    height={hp * 0.04}
                    width={'55%'}
                    textStyle={joinButtonTextStyle}
                />
            </View>
        </ListingCard>
    )

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={AppointmentStyles.background}
            resizeMode="cover"
        >
            <View style={AppointmentStyles.topView}>
                <Text style={AppointmentStyles.tabName}>{t('MyAppointments')}</Text>
            </View>
            <View style={AppointmentStyles.bottomView}>
                <FloatingBackgroundCard>
                    <View style={AppointmentStyles.tabContainer}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[AppointmentStyles.tabButton, selectedTab === tab && AppointmentStyles.activeTab]}
                                onPress={() => setSelectedTab(tab)}
                            >
                                <Text
                                    style={
                                        [AppointmentStyles.tabText,
                                        selectedTab === tab && AppointmentStyles.activeTabText
                                        ]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View >
                    <View style={AppointmentStyles.listContainer}>
                        <FlatList
                            data={appointments}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={AppointmentStyles.flatlistStyle}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                </FloatingBackgroundCard>
            </View>
        </ImageBackground>
    );
};

export default AppointmentScreen;

const cancelButtonTextStyle = {
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
    fontSize: ResponsiveFont(14),
    lineHeight: ResponsiveFont(17),
}

const joinButtonTextStyle = {
    color: Colors.white,
    fontFamily: Fonts.SemiBold,
    fontSize: ResponsiveFont(14),
    lineHeight: ResponsiveFont(17),
}
