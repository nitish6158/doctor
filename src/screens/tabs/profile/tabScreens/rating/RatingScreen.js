import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { RatingStyles } from './RatingStyles';
import {
    Images,
    Colors,
    WindowHeight as hp,
    Fonts,
    ResponsiveFont
} from '../../../../../assets';
import { FloatingBackgroundCard } from '../../../../../components/card';
import { ListingCard } from '../../../../../components/card';
import { useTranslation } from '../../../../../components/customhooks';
import { GetAllRatingAction } from '../../../../../Redux/actions';
import { connect } from 'react-redux';

const RatingScreen = (props) => {
    const t = useTranslation();

    const ratingData = [
        { id: '1', rating: 4 },
        { id: '2', rating: 5 },
        { id: '3', rating: 5 },
        { id: '4', rating: 5 },
        { id: '5', rating: 4 },
        { id: '6', rating: 5 },
        { id: '7', rating: 5 },
        { id: '8', rating: 5 },
        { id: '9', rating: 4 },
        { id: '10', rating: 5 },
        { id: '11', rating: 5 },
        { id: '12', rating: 5 },
        { id: '13', rating: 4 },
        { id: '14', rating: 5 },
        { id: '15', rating: 5 },
        { id: '16', rating: 5 },
        { id: '17', rating: 4 },
        { id: '18', rating: 5 },
        { id: '19', rating: 5 },
        { id: '20', rating: 5 },
        { id: '21', rating: 4 },
        { id: '22', rating: 5 },
        { id: '23', rating: 5 },
        { id: '24', rating: 5 },
        { id: '25', rating: 4 },
        { id: '26', rating: 5 },
        { id: '27', rating: 5 },
        { id: '28', rating: 5 },
    ];


    const renderRatingItem = ({ item }) => {
        return (
            <ListingCard customStyles={RatingStyles.card}>
                <View style={RatingStyles.listItem}>
                    <Image
                        source={Images.ratingUserIcon}
                        style={RatingStyles.avatar}
                    />
                    <View style={RatingStyles.textContainer}>
                        {/* <Text style={RatingStyles.userName}>{item?.doctorName}</Text> */}
                        <Text style={RatingStyles.userName}>{t('Anonymous')}</Text>
                        <View style={RatingStyles.starRow}>
                            {[...Array(5)].map((_, index) => (
                                <Image
                                    key={index}
                                    source={index < item.rating ? Images.star_filled : Images.star_empty}
                                    style={RatingStyles.starIcon}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ListingCard>
        );
    };
    const getAllRating = async () => {
        const reqParam = {
            "pageIndex": 0,
            "pageSize": 0,
            "searchText": '',
            "direction": '',
            "filterByFieldName": '',
            "clinicId": 0,
            "doctorId": props.userId,
            // "doctorId": 1
        }
        await props.GetAllRatingAction(reqParam)
    }

    useEffect(() => {
        getAllRating()
    }, [])

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={RatingStyles.background}
            resizeMode="cover"
        >
            <View style={RatingStyles.topView}>
                <TouchableOpacity
                    style={RatingStyles.tabNameContainer1}
                    onPress={() => props.navigation.goBack()}>
                    <Image
                        source={Images.back_Icon}
                        style={RatingStyles.backIcon}
                    />
                </TouchableOpacity>
                <View style={RatingStyles.tabNameContainer}>
                    <Text style={RatingStyles.tabName}>{t('MyRating')}</Text>
                </View>
            </View>

            <View style={RatingStyles.bottomView}>
                <FloatingBackgroundCard>
                    {/* {
                        props?.getAllRating
                     ? */}

                        <FlatList
                            data={ratingData}
                            renderItem={renderRatingItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={RatingStyles.listContainer}
                            showsVerticalScrollIndicator={false}
                        />
{/*                     
                    :
                    <View style={RatingStyles.NoDataFoundContainer}>
                        <Image
                            source={Images.nodatafound}
                            style={RatingStyles.NoDataFound}
                        />
                    </View>
} */}
                </FloatingBackgroundCard>
            </View>
        </ImageBackground>
    );
};

const mapStateToProps = (state) => ({
    loading: state.getAllRatingReducer.loading,
    errMsg: state.getAllRatingReducer.errMsg,
    getRatingData: state.getAllRatingReducer.getRatingData,
    getRatingResponseCode: state.getAllRatingReducer.getRatingResponseCode,
    userData: state.authReducer.userData,
    userId: state.authReducer.userId,
});

const mapDispatchToProps = {
    GetAllRatingAction
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingScreen);



