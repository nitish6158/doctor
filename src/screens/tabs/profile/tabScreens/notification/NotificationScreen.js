import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import {
    Images,
    Colors,
    Fonts,
    ResponsiveFont
} from '../../../../../assets';
import { NotificationStyles } from './NotificationStyles';
import { FloatingBackgroundCard, ListingCard } from '../../../../../components/card';
import { useTranslation } from '../../../../../components/customhooks';

const NotificationScreen = (props) => {
    const t = useTranslation();

    const notificationData = [
        {
            id: '1',
            title: 'Payment Successful',
            subtitle: 'Appointment Booked for 15 April 2025',
            icon: Images.payment_success,
            section: 'Today'
        },
        {
            id: '2',
            title: 'Reminder',
            subtitle: 'Appointment Coming',
            icon: Images.icon_notification3,
            section: 'Today'
        },
        {
            id: '3',
            title: 'Reminder',
            subtitle: 'Appointment Coming',
            icon: Images.icon_notification3,
            section: 'Today'
        },
        {
            id: '4',
            title: 'Payment Successful',
            subtitle: 'Appointment Booked for 15 April 2025',
            icon: Images.payment_success, section: 'Yesterday'
        },
        {
            id: '7',
            title: 'Reminder',
            subtitle: 'Appointment Coming',
            icon: Images.icon_notification3,
            section: 'Yesterday'
        },
        {
            id: '10',
            title: 'Reminder',
            subtitle: 'Appointment Coming',
            icon: Images.icon_notification3,
            section: 'Yesterday'
        },
        {
            id: '11',
            title: 'Reminder',
            subtitle: 'Appointment Coming',
            icon: Images.icon_notification3,
            section: 'Yesterday'
        },
        {
            id: '12',
            title: 'Reminder',
            subtitle: 'Appointment Coming',
            icon: Images.icon_notification3,
            section: '04/05/2025'
        },
        {
            id: '17',
            title: 'Reminder',
            subtitle: 'Appointment Coming',
            icon: Images.icon_notification3,
            section: '04/05/2025'
        },
   
    ];

    const groupedData = notificationData.reduce((acc, item) => {
        if (!acc[item.section]) acc[item.section] = [];
        acc[item.section].push(item);
        return acc;
    }, {});

    const flatListData = Object.keys(groupedData).flatMap((section) => [
        { type: 'header', title: section },
        ...groupedData[section].map(item => ({ ...item, type: 'item' }))
    ]);

    const renderItem = ({ item }) => {
        if (item.type === 'header') {
            return <Text style={NotificationStyles.sectionHeader}>{item.title}</Text>;
        }

        return (
            <ListingCard customStyles={NotificationStyles.card}>
                <View style={NotificationStyles.listItem}>
                    <Image source={item.icon} style={NotificationStyles.avatar} />
                    <View style={NotificationStyles.textContainer}>
                        <Text style={NotificationStyles.userName}>{item.title}</Text>
                        <Text style={NotificationStyles.subText}>{item.subtitle}</Text>
                    </View>
                </View>
            </ListingCard>
        );
    };

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={NotificationStyles.background}
            resizeMode="cover"
        >
            <View style={NotificationStyles.topView}>
                <TouchableOpacity
                    style={NotificationStyles.tabNameContainer1}
                    onPress={() => props.navigation.goBack()}
                >
                    <Image source={Images.back_Icon} style={NotificationStyles.backIcon} />
                </TouchableOpacity>
                <View style={NotificationStyles.tabNameContainer}>
                    <Text style={NotificationStyles.tabName}>{t('Notification')}</Text>
                </View>
            </View>

            <View style={NotificationStyles.bottomView}>
                <FloatingBackgroundCard>
                    <FlatList
                        data={flatListData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id ? item.id : `header-${index}`}
                        contentContainerStyle={NotificationStyles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </FloatingBackgroundCard>
            </View>
        </ImageBackground>
    );
};

export default NotificationScreen;
