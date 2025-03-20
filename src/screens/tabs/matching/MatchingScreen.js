import React, { Component } from 'react';
import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native';
import { MatchingStyles } from './MatchingStyles';
import { FloatingBackgroundCard, ListingCard } from '../../../components/card';
import { Images, opacityOfButton } from '../../../assets';
import { CustomButton } from '../../../components/button';
import { useTranslation } from '../../../components/customhooks';

const data = [
    {
        id: '1',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id: '2',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '6',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '3',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '4',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '5',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '465345643',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id: '2635653',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '656546546',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '546456543',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '46546546',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
    {
        id: '5565463366',
        title: 'Obstetrics and Gynecology',
        hospital: 'Heartcare Hospital',
        description: 'Medical professional who diagnoses and treats health conditions. They are trained and qualified to provide health...',
        location: '70 Washington Square South, New York, NY',
    },
];

const MatchingScreen = () => {
    const t=useTranslation();

    const renderItem = ({ item }) => (
        <ListingCard>
            <View style={MatchingStyles.detailContainer}>
                <View style={MatchingStyles.imageContainer}>
                    <Image
                        source={Images.icon_home_enable}
                        style={MatchingStyles.cardImage}
                    />
                </View>
                <View style={MatchingStyles.textContainer}>
                    <Text style={MatchingStyles.title}>
                        {item.title}
                    </Text>
                    <Text style={MatchingStyles.subTitle}>
                        {item.hospital}
                    </Text>
                </View>
            </View>

            <View style={MatchingStyles.descriptionContainer}>
                <Text style={MatchingStyles.description}>{item.description}</Text>
            </View>

            <View style={MatchingStyles.addressContainer}>
                <Image
                    source={Images.icon_map}
                    style={MatchingStyles.mapStyle}
                />
                <Text style={MatchingStyles.locationStyle}>{item.location}</Text>
            </View>

            <TouchableOpacity
                style={MatchingStyles.buttonStyles}
                onPress={() => { console.log("React") }}
                activeOpacity={opacityOfButton}
            >
                <Text style={MatchingStyles.buttonTextStyle}>{t('ViewDetail')}</Text>
            </TouchableOpacity>
        </ListingCard>
    )

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={MatchingStyles.background}
            resizeMode="cover"
        >
            <View style={MatchingStyles.topView}>
                <Text style={MatchingStyles.tabName}>{t('MyMatching')}</Text>
            </View>

            <FloatingBackgroundCard customStyles={MatchingStyles.bottomView}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={MatchingStyles.flatlistStyle}
                    showsVerticalScrollIndicator={false}
                />
            </FloatingBackgroundCard>
        </ImageBackground>
    );
};


export default MatchingScreen;
