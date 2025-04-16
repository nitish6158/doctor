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
} from '../../../../../assets';
import { LocationStyles } from './LocationStyles';
import { FloatingBackgroundCard, ListingCard } from '../../../../../components/card';
import { CustomButton } from '../../../../../components/button';
import { useTransition } from 'react';
import { AddLocationModal, AvailabilityModal, DeleteLocationModal, Loader } from '../../../../../components/modal';
import { AddLocationAction, ClearErrorStatus, GetLocationAction } from '../../../../../Redux/actions';
import { connect } from 'react-redux';
import { ToastMsg } from '../../../../../components/Toast';
import { ClearLocationStatus, DeleteLocationAction } from '../../../../../Redux/actions/LocationAction';
import { useTranslation } from '../../../../../components/customhooks';
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
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [updateLocationId, setUpdateLocationId] = useState(0);

    const [isUpdate, setIsUpdate] = useState(false)
    const [idForDelete, setIdForDelete] = useState(null)

    const renderItem = ({ item }) => (

        <ListingCard customStyles={LocationStyles.card1} >
            <View style={LocationStyles.firstBox}>
                <View style={LocationStyles.ButtonContainer}>
                    <Image
                        source={Images.icon_home_enable}
                        style={LocationStyles.icon}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <View style={LocationStyles.locationText}>
                <Text style={LocationStyles.title}>{item.locationName}</Text>
                <Text style={LocationStyles.buildingName}>{item.buildingName}</Text>
                <Text style={LocationStyles.buildingName}>{item.address}</Text>
            </View>
            <View style={LocationStyles.ButtonParent}>
                <TouchableOpacity
                    style={LocationStyles.ButtonContainer}
                    onPress={() => onEdit(item)}>
                    <Image
                        source={Images.edit}
                        style={LocationStyles.icon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[LocationStyles.ButtonContainer, { marginTop: "5%" }]}
                    onPress={() => {
                        setIsDeleteModalVisible(true),
                            setIdForDelete(item.id)
                    }}>
                    <Image
                        source={Images.icon_delete}
                        style={LocationStyles.icon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </ListingCard>

    )

    const AddLocation = () => {
        if (!locationName) {
            ToastMsg(t('EnterLocationName'), 'bottom');
            return false;
        }

        if (!buildingDetail) {
            ToastMsg(t('EnterBuildingDetails'), 'bottom');
            return false;
        }

        if (!address) {
            ToastMsg(t('EnterAddress'), 'bottom');
            return false;
        }
        let reqParam = {
            "id": updateLocationId,
            "doctorId": props.userId,
            "locationName": locationName,
            "buildingName": buildingDetail,
            "address": address
        }
        onAddNewLocation(reqParam);
    }



    const onEdit = (item) => {
        setIsUpdate(true)
        setIsModalOpen(true)
        setLocationName(item.locationName)
        setBuildingDetail(item.buildingName)
        setAddress(item.address)
        setUpdateLocationId(item.id)
    }

    const ClearStatus = async () => {
        await props.ClearLocationStatus();
    }
    const onConfirmDelete = async () => {
        await props.DeleteLocationAction(idForDelete);
    }
    const getAllLocations = async () => {
        await props.GetLocationAction(props.userId);
    }
    const onAddNewLocation = async (data) => {
        await props.AddLocationAction(data);
    }

    useEffect(() => {
        getAllLocations()
    }, [])

    useEffect(() => {
        if (props?.deleteLocationResponseCode === 200) {
            ToastMsg(props.errMsg, 'bottom');
            setIsDeleteModalVisible(false)
            getAllLocations()
            setIdForDelete(null)
        }
        if (props?.addLocationResponseCode === 200) {
            setIsModalOpen(false)
            setIsLocationAddModalOpen(true)
            setTimeout(() => {
                setIsLocationAddModalOpen(false)
            }, 1100)
            getAllLocations()
            setIsUpdate(false)
            setLocationName("")
            setBuildingDetail("")
            setAddress("")
            setUpdateLocationId(0)
        } else if (props?.errMsg != null && props.getLocationResponseCode != 200) {
            ToastMsg(props.errMsg, 'bottom');
        }
        ClearStatus()
    }, [
        props.addLocationResponseCode,
        props.deleteLocationResponseCode,
        props.getLocationResponseCode
    ])



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
                    <Text style={LocationStyles.tabName}>{t('MyLocations')}</Text>
                </View>
            </View>


            <View style={LocationStyles.bottomView}>
                <FloatingBackgroundCard customLocationStyles={LocationStyles.bottomView} >
                    {props?.getLocationData && props?.getLocationData?.length != 0 ?
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
                            setUpdateLocationId(0)
                        }}
                        style={LocationStyles.ButtonStyle}
                    >
                        <Text style={LocationStyles.buttonText}>{t('AddNewLocation')}</Text>
                    </TouchableOpacity>
                </FloatingBackgroundCard>
            </View>
            <AddLocationModal
                visible={isModalOpen}
                onClose={() => {
                    setIsUpdate(false)
                    setIsModalOpen(false)
                    setLocationName("")
                    setBuildingDetail("")
                    setAddress("")
                    setUpdateLocationId(0)
                }}
                onAddNewLocation={AddLocation}
                locationName={locationName}
                setLocationName={setLocationName}
                buildingDetail={buildingDetail}
                setBuildingDetail={setBuildingDetail}
                address={address}
                setAddress={setAddress}
                isUpdate={isUpdate}
            />
            <DeleteLocationModal
                isModalOpen={isDeleteModalVisible}
                onClose={() => {
                    setIsDeleteModalVisible(false)
                }}
                onConfirmDelete={onConfirmDelete}
            />
            <Loader
                visible={props.loading}
            />
            <AvailabilityModal
                isModalOpen={isLocationAddModalOpen}
                onClose={() => (setIsLocationAddModalOpen(false))}
                type={!isUpdate ? "locationUpdate" : "locationAdd"}
                heading={!isUpdate ? t('LocationUpdated') : t('LocationAdded')}
            />
            {/* <AvailabilityModal
                isModalOpen={isLocationUpdateModalOpen}
                onClose={() => (setIsLocationUpdateModalOpen(false))}
                type={"locationUpdate"}
                heading={"Location Updated"}
            /> */}
        </ImageBackground>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        loading: state.locationReducer.loading,
        addLocationResponseCode: state.locationReducer.addLocationResponseCode,
        deleteLocationResponseCode: state.locationReducer.deleteLocationResponseCode,
        getLocationResponseCode: state.locationReducer.getLocationResponseCode,
        errMsg: state.locationReducer.errMsg,
        addLocationData: state.locationReducer.addLocationData,
        getLocationData: state.locationReducer.getLocationData,
        deleteLocationData: state.locationReducer.deleteLocationData,
    };
};

const mapDispatchToProps = {
    AddLocationAction,
    GetLocationAction,
    DeleteLocationAction,
    ClearLocationStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);


// const onUpdateLocation = async () => {
//     setIsModalOpen(false)
//     setIsLocationUpdateModalOpen(true)
//     if (!locationName) {
//         ToastMsg('Please Enter Location Name', 'bottom');
//         return false;
//     }
//     if (!buildingDetail) {
//         ToastMsg('Please Enter Building Details', 'bottom');
//         return false;
//     }
//     if (!address) {
//         ToastMsg('Please Enter Address', 'bottom');
//         return false;
//     }

//     let reqParam = {
//         "id": updateLocationId,
//         "doctorId": props.userId,
//         "locationName": locationName,
//         "buildingName": buildingDetail,
//         "address": address
//     }
//     await props.AddLocationAction(reqParam);
//     getAllLocations();
// }
