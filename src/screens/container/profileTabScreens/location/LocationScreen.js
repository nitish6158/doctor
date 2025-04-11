import React, { useEffect, useState } from 'react';
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
    WindowHeight as hp,
    Fonts,
    ResponsiveFont
} from '../../../../assets';
import { LocationStyles } from './LocationStyles';
import { FloatingBackgroundCard, ListingCard } from '../../../../components/card';
import { CustomButton } from '../../../../components/button';
import { useTranslation } from '../../../../components/customhooks';
import { AddLocationModal, AvailabilityModal } from '../../../../components/modal';
import { AddLocationAction, GetLocationAction } from '../../../../Redux/actions';
import { connect } from 'react-redux';
import { ToastMsg } from '../../../../components/Toast';
import { ClearLocationStatus } from '../../../../Redux/actions/LocationAction';

const locations = [
    {
        id: '1',
        title: 'Work 1',
        address: '209, 1st Floor, Right Wing, MPSEDC STP Building, Electronic Complex, Pardesipura, Indore, Madhya Pradesh, India-452010',
    },
    {
        id: '2',
        title: 'Work 2',
        address: '209, 1st Floor, Right Wing, MPSEDC STP Building, Electronic Complex, Pardesipura, Indore, Madhya Pradesh, India-452010',
    },
    {
        id: '3',
        title: 'Clinic 34543',
        address: '209, 1st Floor, Right Wing, MPSEDC STP Building, Electronic Complex, Pardesipura, Indore, Madhya Pradesh, India-452010',
    },
    {
        id: '7',
        title: 'Work 1654',
        address: '209, 1st Floor, Right Wing, MPSEDC STP Building, Electronic Complex, Pardesipura, Indore, Madhya Pradesh, India-452010',
    },
    {
        id: '8',
        title: 'Work 56',
        address: 'rajpur area India-452010',
    },
    {
        id: '9',
        title: 'Clinic 1',
        address: 'Chavvani road India-452010',
    }
];


const LocationScreen = (props) => {
    const t = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLocationAddModalOpen, setIsLocationAddModalOpen] = useState(false)
    const [isLocationUpdateModalOpen, setIsLocationUpdateModalOpen] = useState(false)


    const [locationName, setLocationName] = useState('');
    const [buildingDetail, setBuildingDetail] = useState('');
    const [address, setAddress] = useState('');
    const [updateLocationId, setUpdateLocationId] = useState(null);

    const [isUpdate, setIsUpdate] = useState(false)

    const renderItem = ({ item }) => (

        <ListingCard >
            <View style={LocationStyles.row}>
                <View style={LocationStyles.ButtonContainer}>
                    <Image
                        source={Images.icon_home_enable}
                        style={LocationStyles.icon}
                        resizeMode="contain"
                    />
                </View>

                <Text style={LocationStyles.title}>{item.locationName}</Text>
                <TouchableOpacity
                    style={LocationStyles.ButtonContainer}
                    onPress={() => onEdit(item)}>
                    <Image
                        source={Images.edit}
                        style={LocationStyles.icon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <Text style={LocationStyles.buildingName}>{item.buildingName}</Text>
            <Text style={LocationStyles.buildingName}>{item.address}</Text>
        </ListingCard>

    )

    const onAddNewLocation = async () => {
        setIsModalOpen(false)
        setIsLocationAddModalOpen(true)
        AddLocation();
    }
    const AddLocation = async () => {
        if (!locationName) {
            ToastMsg('Please Enter Location Name', 'bottom');
            return false;
        }
        if (!buildingDetail) {
            ToastMsg('Please Enter Building Details', 'bottom');
            return false;
        }
        if (!address) {
            ToastMsg('Please Enter Address', 'bottom');
            return false;
        }

        let reqParam = {
            "id": updateLocationId,
            "doctorId": userId,
            "locationName": locationName,
            "buildingName": buildingDetail,
            "address": address
        }
        await props.AddLocationAction(reqParam);
        props.ClearLocationStatus();
    }
    const onUpdateLocation = async () => {
        setIsModalOpen(false)
        setIsLocationUpdateModalOpen(true)
        if (!locationName) {
            ToastMsg('Please Enter Location Name', 'bottom');
            return false;
        }
        if (!buildingDetail) {
            ToastMsg('Please Enter Building Details', 'bottom');
            return false;
        }
        if (!address) {
            ToastMsg('Please Enter Address', 'bottom');
            return false;
        }

        let reqParam = {
            "id": updateLocationId,
            "doctorId": props.userId,
            "locationName": locationName,
            "buildingName": buildingDetail,
            "address": address
        }
        await props.AddLocationAction(reqParam);
        getAllLocations();
    }

    const onEdit = (item) => {
        setIsUpdate(true)
        setIsModalOpen(true)
        setLocationName(item.locationName)
        setBuildingDetail(item.buildingName)
        setAddress(item.address)
        setUpdateLocationId(item.id)
    }

    useEffect(() => {
        getAllLocations();
    }, []);

    const getAllLocations = async () => {
        await props.GetLocationAction(props.userId);
    }

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={LocationStyles.background}
            resizeMode="cover"
        >

            <View style={LocationStyles.topView}>
                <TouchableOpacity
                    style={LocationStyles.tabNameContainer1}
                    onPress={() => props.navigation.goBack()}>
                    <Image
                        source={Images.back_Icon}
                        style={LocationStyles.backIcon}
                    />
                </TouchableOpacity>
                <View style={LocationStyles.tabNameContainer}>
                    <Text style={LocationStyles.tabName}>My Locations</Text>
                </View>
            </View>


            <View style={LocationStyles.bottomView}>
                <FloatingBackgroundCard customLocationStyles={LocationStyles.bottomView} >
                    {props?.getLocationData ?
                        <FlatList
                            data={props.getLocationData}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            contentContainerStyle={{ alignItems: 'center', marginVertical: '2%', paddingBottom: '20%' }}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <View style={LocationStyles.NoDataFoundContainer}>
                            <Image
                                source={Images.nodatafound}
                                style={LocationStyles.NoDataFound}
                            />
                        </View>
                    }
                    <TouchableOpacity
                        onPress={() => {
                            setIsModalOpen(true)
                            setLocationName("")
                            setBuildingDetail("")
                            setAddress("")
                            setUpdateLocationId(null)
                        }}
                        style={LocationStyles.ButtonStyle}
                    >
                        <Text style={LocationStyles.buttonText}>Add New Location</Text>
                    </TouchableOpacity>
                </FloatingBackgroundCard>
            </View>
            <AddLocationModal
                visible={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setIsUpdate(false)
                }
                }
                onAddNewLocation={onAddNewLocation}
                onUpdateLocation={onUpdateLocation}
                locationName={locationName}
                setLocationName={setLocationName}
                buildingDetail={buildingDetail}
                setBuildingDetail={setBuildingDetail}
                address={address}
                setAddress={setAddress}

                isUpdate={isUpdate}
            />
            <AvailabilityModal
                // visible={isModalOpen}
                isModalOpen={isLocationAddModalOpen}
                onClose={() => (setIsLocationAddModalOpen(false))}
                type={"locationAdd"}
                heading={"Location Added"}
            />
            <AvailabilityModal
                // visible={isModalOpen}
                isModalOpen={isLocationUpdateModalOpen}

                onClose={() => (setIsLocationUpdateModalOpen(false))}
                type={"locationUpdate"}
                heading={"Location Updated"}
            />

        </ImageBackground>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        loading: state.locationReducer.loading,
        responseCode: state.locationReducer.responseCode,
        errMsg: state.locationReducer.errMsg,
        getLocationData: state.locationReducer.getLocationData,

    };
};

const mapDispatchToProps = {
    AddLocationAction,
    GetLocationAction,
    ClearLocationStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);

