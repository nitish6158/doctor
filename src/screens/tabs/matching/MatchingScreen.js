import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MatchingStyles } from './MatchingStyles';
import { FloatingBackgroundCard, ListingCard } from '../../../components/card';
import { Images, opacityOfButton, WindowWidth as wp, Colors } from '../../../assets';
import { CustomButton } from '../../../components/button';
import { useTranslation } from '../../../components/customhooks';
import { CustomDropdown } from '../../../components/dropdown';
import { AddressInput, CustomTextInput } from '../../../components/input';
import { getRequest } from '../../../Redux/config';
import { END_POINT } from '../../../Redux/config';
import {
    addMatchingAction,
    ClearStatusMatching,
    getMyJobData,
    getMyMatchingAction
} from '../../../Redux/actions';
import { connect } from 'react-redux';
import { ToastMsg } from '../../../components/Toast';
import {
    AvailabilityModal,
    Loader,
    MatchingDetailModal
} from '../../../components/modal';
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

const MatchingScreen = (props) => {

    const lang = props?.appLanguage?.toLowerCase()
    const t = useTranslation();
    const [countryArr, setCountryArr] = useState(null)
    const [specializationArr, setSpecializationArr] = useState(null)
    const [addMatchingInProgess, setIsAddMatchingprogress] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMatchingModalVisible, setIsMatchingModalVisible] = useState(false)
    const [specialization, setSpecialization] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [experience, setExperience] = useState("")
    const [consultationType, setConsultationType] = useState('online');
    const [profile, setProfile] = useState('');

    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleViewDetail = (mobile, email) => {
        setMobileNumber(mobile)
        setEmail(email);
        setIsMatchingModalVisible(true)
    }

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
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={MatchingStyles.subTitle}>{item.clinicName}</Text>
                        <Text style={MatchingStyles.subTitle}> | {item.experience} Years</Text>
                    </View>
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
                onPress={() => { handleViewDetail(item?.mobileNo, item?.email) }}
                activeOpacity={opacityOfButton}
            >
                <Text style={MatchingStyles.buttonTextStyle}>{t('ViewDetail')}</Text>
            </TouchableOpacity>
        </ListingCard>
    )

    useEffect(() => {
        if (addMatchingInProgess) {
            fetchDoctorSpecialization();
            fetchDoctorCountry();
        }
    }, [addMatchingInProgess]);
    useEffect(() => {
        if (props.isJobAdded == 1) {
            fetchJobData()
        }
    }, [props.isJobAdded, props.responseCode2]);
    useEffect(() => {
        if (props.isJobAdded == 1) {
            fetchMatchingList()
        }
    }, [props.responseCode2,])

    useEffect(() => {
        if (props.responseCode2 === 200) {
            setIsModalVisible(true);
            setTimeout(() => {
                setIsModalVisible(false)
                setIsAddMatchingprogress(false);
            }, 1500)
            ClearStatus()
        }
    }, [props.responseCode2]);


    const fetchDoctorSpecialization = async () => {
        try {
            const data = await getRequest(END_POINT.specilization(lang));
            if (data && data?.data) {
                setSpecializationArr(data.data)
            }
        } catch (err) {
            console.warn("Error fetching specializations:", err);
        }
    };
    const fetchDoctorCountry = async () => {
        try {
            const data = await getRequest(END_POINT.getCountry(props?.appLanguage?.toLowerCase()));
            if (data && data?.data) {
                setCountryArr(data?.data)
            }

        } catch (err) {
            console.warn("Error fetching specializations:", err);
        }
    };

    const handleAddmatching = async () => {
        if (country == '') {
            ToastMsg(t('PleaseSelectCountry'), 'bottom');
            return false;
        }
        if (address == '') {
            ToastMsg(t('PleaseSelectCountry'), 'bottom');
            return false;
        }

        if (specialization == '') {
            ToastMsg(t('SelectSpecialization'), 'bottom');

            return false;
        }
        if (experience == '') {
            ToastMsg('Please enter experience', 'bottom');
            return false;
        }
        if (consultationType == '') {
            ToastMsg('Please select Consulatation type', 'bottom');
            return false;
        }

        let editId = props?.getJobData?.id ? props?.getJobData?.id : 0

        const reqParams = {
            "id": editId,
            "country": country,
            "address": address,
            "specialization": specialization,
            "experience": experience,
            "type": consultationType,
            "doctorId": props.userId,
            "profile": profile

        };
        await props.addMatchingAction(reqParams);
    }

    // useEffect(() => {
    //     if (props?.addMatchingData !== 200) {
    //         ToastMsg(props.errMsg, 'bottom')
    //     }
    //     if (props?.getJobData !== 200) {
    //         ToastMsg(props.errMsg, 'bottom')
    //     }
    // }, [])
    const fetchJobData = async () => {
        await props.getMyJobData(props.userId)
    }
    const fetchMatchingList = async () => {
        const reqParam =
        {
            "pageIndex": 0,
            "pageSize": 0,
            "searchText": "",
            "direction": "",
            "filterByFieldName": "",
            "country": props?.getJobData?.country ? props?.getJobData?.country : country,
            "address": props?.getJobData?.address ? props?.getJobData?.address : address,
            "profile": props?.getJobData?.profile ? props?.getJobData?.profile : profile,
            "specialization": props?.getJobData?.specialization ? props?.getJobData?.specialization : specialization,
            "experience": props?.getJobData?.experience ? props?.getJobData?.experience : experience,
            "type": props?.getJobData?.type ? props?.getJobData?.type : consultationType,
        }
        await props.getMyMatchingAction(reqParam)
    }
    const ClearStatus = async () => {
        await props.ClearStatusMatching();
    }
    const handleEdit = () => {
        setSpecialization(props?.getJobData?.specialization ? props?.getJobData?.specialization : "")
        setAddress(props?.getJobData?.address ? props?.getJobData?.address : '')
        setProfile(props?.getJobData?.profile ? props?.getJobData?.profile : '')
        setCountry(props?.getJobData?.country ? props?.getJobData?.country : '')
        setExperience(props?.getJobData?.experience ? props?.getJobData?.experience : '')
        setConsultationType(props?.getJobData?.type ? props?.getJobData?.type : 'online')
        setIsAddMatchingprogress(true);
    }
    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={MatchingStyles.background}
            resizeMode="cover"
        >
            {/* <View style={MatchingStyles.topView}>
                <Text style={MatchingStyles.tabName}>{t('MyMatching')}</Text>
            </View> */}
            <View style={MatchingStyles.topView}>
                <TouchableOpacity
                    style={MatchingStyles.tabNameContainer1}
                    onPress={() => {
                        addMatchingInProgess ?
                        setIsAddMatchingprogress(false)
                        :
                        props.navigation.goBack()

                    }}>
                    <Image
                        source={Images.back_Icon}
                        style={MatchingStyles.backIcon}
                    />
                </TouchableOpacity>
                <View style={MatchingStyles.tabNameContainer}>
                    <Text style={MatchingStyles.tabName}>{t('MyMatching')}</Text>
                </View>
            </View>

            <FloatingBackgroundCard customStyles={MatchingStyles.bottomView}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    {
                        addMatchingInProgess ?
                            <View style={MatchingStyles.formContainer}>
                                <Text style={MatchingStyles.heading}>{t('AddMatching')}</Text>
                                <CustomDropdown
                                    heading={t('SelectCountry')}
                                    placeholder={t('Select')}
                                    selectedValue={country}
                                    onValueChange={setCountry}
                                    options={countryArr}
                                    width='100%'
                                    type="country"
                                    containerstyle={{
                                        marginVertical: '1%',
                                    }}
                                />
                                <AddressInput
                                    heading={t('Address')}
                                    placeholder={t('EnterAddress')}
                                    value={address}
                                    onChangeText={setAddress}
                                    width='100%'
                                    containerstyle={{
                                        marginVertical: '1%',
                                    }}
                                />
                                <AddressInput
                                    heading={t('Profile')}
                                    placeholder={t('EnterYourProfile')}
                                    value={profile}
                                    onChangeText={setProfile}
                                    width='100%'
                                    containerstyle={{
                                        marginVertical: '1%',
                                    }}
                                />
                                <CustomDropdown
                                    heading={t('Specialization')}
                                    placeholder={t('Select')}
                                    selectedValue={specialization}
                                    onValueChange={setSpecialization}
                                    options={specializationArr}
                                    width='100%'
                                    type="specialization"
                                    containerstyle={{
                                        marginVertical: '1%',
                                    }}
                                />
                                <CustomTextInput
                                    heading={t('Experience')}
                                    placeholder={t('EnterWorkExperience')}
                                    value={experience}
                                    onChangeText={setExperience}
                                    type="experience"
                                    width='100%'
                                />
                                <View style={{
                                    marginVertical: '1%',
                                }}>
                                    <Text style={MatchingStyles.consulationText}>{t('SelectConsultationType')}</Text>
                                    <View style={MatchingStyles.modeContainer}>
                                        <TouchableOpacity
                                            style={[MatchingStyles.modeButton, {
                                                marginHorizontal: '0%',
                                                borderColor: consultationType === 'online' ?
                                                    Colors.blue : Colors.gray
                                            }]}
                                            onPress={() => { setConsultationType("online") }}
                                        >
                                            <Image
                                                source={Images.online}
                                                style={MatchingStyles.buttonImage}
                                            />
                                            <Text
                                                style={MatchingStyles.modeText}
                                            >{t('Online')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[MatchingStyles.modeButton, {
                                                borderColor: consultationType === 'offline' ?
                                                    Colors.blue :
                                                    Colors.gray
                                            }]}
                                            onPress={() => { setConsultationType("offline") }}
                                        >
                                            <Image
                                                source={Images.offline}
                                                style={MatchingStyles.buttonImage}
                                            />
                                            <Text
                                                style={MatchingStyles.modeText
                                                }
                                            >{t('Offline')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <CustomButton
                                    title={t('AddMatching')}
                                    width='100%'
                                    marginVertical='7%'
                                    onPress={
                                        handleAddmatching
                                    }
                                />
                            </View>
                            :
                            <>
                                {!props.isJobAdded == 1 ?
                                    <View
                                        style={MatchingStyles.matchingContainer}>
                                        <Image
                                            source={Images.MatchingAdd}
                                            style={MatchingStyles.matchingIcon}
                                        />
                                        <Text style={MatchingStyles.jobInfoText}>{t('AddJobInformation')}</Text>
                                        <TouchableOpacity
                                            onPress={() => setIsAddMatchingprogress(true)}
                                            style={MatchingStyles.tabButton}>
                                        <Text style={MatchingStyles.tabText}>{t('AddMatching')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <>

                                        <>
                                            {props?.getJobData &&
                                                <ListingCard customStyles={MatchingStyles.listingCard}>
                                                    <View style={MatchingStyles.cardTopView}>
                                                        <View style={MatchingStyles.cardTextcontainer}>
                                                            <Text style={MatchingStyles.headingText}>{t('Specialty')}</Text>
                                                            <Text style={MatchingStyles.headingTextValue2}>{
                                                                props?.getJobData?.specialization
                                                            }</Text>
                                                        </View>
                                                        <View style={MatchingStyles.cardImageContainer}>
                                                            <TouchableOpacity
                                                                style={MatchingStyles.editIconContainer}
                                                                onPress={handleEdit}
                                                            >
                                                                <Image
                                                                    source={Images.edit}
                                                                    style={MatchingStyles.editIcon}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>

                                                    </View>
                                                    <View style={MatchingStyles.cardBottomView}>
                                                        <View style={MatchingStyles.cardUpperView}>
                                                            <View style={MatchingStyles.part1}>
                                                                <Text style={MatchingStyles.headingText}>
                                                                    {t('ConsultationType')}
                                                                </Text>
                                                                <View style={MatchingStyles.modeButton1}>
                                                                    <Text style={MatchingStyles.modeText1}>
                                                                        {props?.getJobData?.type}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={MatchingStyles.part2}>
                                                                <Text style={MatchingStyles.headingText}>{t('WorkExperience')}</Text>
                                                                <Text style={MatchingStyles.headingTextValue}>{props?.getJobData?.experience}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={MatchingStyles.cardLowerView}>
                                                            <View style={MatchingStyles.part2}>
                                                                <Text style={MatchingStyles.headingText}>{t('Country')}</Text>
                                                                <Text style={MatchingStyles.headingTextValue}>{props?.getJobData?.country}</Text>
                                                            </View>
                                                            <View style={MatchingStyles.part1}>
                                                                <Text style={MatchingStyles.headingText}>{t('Profile')}</Text>
                                                                <Text style={MatchingStyles.headingTextValue}>{props?.getJobData?.profile}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </ListingCard>
                                            }
                                        </>

                                        <Text style={MatchingStyles.heading2}>{t('MyMatchings')}</Text>
                                        {props?.getMyMatchingData && props?.getMyMatchingData?.jobPostingResponseList ?
                                            <>
                                                <FlatList
                                                    data={props?.getMyMatchingData?.jobPostingResponseList}
                                                    // data={data}
                                                    renderItem={renderItem}
                                                    keyExtractor={(item) => item.id.toString()}
                                                    contentContainerStyle={MatchingStyles.flatlistStyle}
                                                    showsVerticalScrollIndicator={false}
                                                    scrollEnabled={false}
                                                />

                                            </>
                                            :
                                            <View style={MatchingStyles.NoDataFoundContainer}>
                                                <Image
                                                    source={Images.nodatafound}
                                                    style={MatchingStyles.NoDataFound}
                                                />
                                            </View>
                                        }
                                    </>
                                }
                            </>
                    }
                </ScrollView>


            </FloatingBackgroundCard>

            <AvailabilityModal
                heading={t('MatchingAdded')}
                isModalOpen={isModalVisible}
                onClose={() => {
                    setIsModalVisible(false)
                }}
                type={'matching'}
            />

            <Loader
                visible={props.loading}
            />

            <MatchingDetailModal
                visible={isMatchingModalVisible}
                onClose={() => setIsMatchingModalVisible(false)}
                mobileNumber={mobileNumber}
                email={email}
            />
        </ImageBackground>
    );
};


const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        loading: state.matchingReducer.loading,
        appLanguage: state.authReducer.appLanguage,
        isJobAdded: state.authReducer.isJobAdded,
        addMatchingData: state.matchingReducer.addMatchingData,
        getJobData: state.matchingReducer.getJobData,
        getMyMatchingData: state.matchingReducer.myMatchingData,
        responseCode2: state.matchingReducer.responseCode2,
        responseCode: state.matchingReducer.responseCode,
        errMsg: state.matchingReducer.errMsg,
    };
};

const mapDispatchToProps = {
    addMatchingAction,
    getMyJobData,
    getMyMatchingAction,
    ClearStatusMatching
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchingScreen);
