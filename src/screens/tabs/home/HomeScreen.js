import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Pressable,
    BackHandler,
} from 'react-native';
import { Images, Colors } from '../../../assets';
import { HomeStyles } from './HomeStyles';
import { CustomButton } from '../../../components/button';
import { FloatingBackgroundCard } from '../../../components/card';
import { connect } from 'react-redux';
import { useTranslation } from '../../../components/customhooks';
import { useFocusEffect } from '@react-navigation/native';
import { BankModal, Loader } from '../../../components/modal';
import { Provider as PaperProvider } from 'react-native-paper';
import { Menu } from 'react-native-paper';
import { UpdateUserInfo, GetAllClinicAction, UpdateClinicIdAction } from '../../../Redux/actions'
const HomeScreen = (props) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedClinicName, setSelectedClinicName] = useState(props.GlobalSelectedClinicName || "Select Clinic");
    const [selectedClinicId, setSelectedClinicId] = useState(props.GlobalSelectedClinicId || 0);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const t = useTranslation();
    const handleBankDetails = () => {
        setIsBankModalOpen(false)
        props.navigation.navigate('BankFormScreen');
    }
    const handleContractDetails = () => {
        props.navigation.navigate('ContractScreen');
    }

    const [isBankModalOpen, setIsBankModalOpen] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                BackHandler.exitApp();
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, []),
    );

    useEffect(() => {
        if (!props.individual) {
            fetchAllClinics();
        }
        if (!props.userData?.bankDetails && props.isVerified === 1) {
            // setIsBankModalOpen(true)
        }
    }, [props.isVerified])

    const updateUserData = useCallback(async () => {
        await props.UpdateUserInfo(props.userId);
    }, [props.userId, props.UpdateUserInfo]);

    useFocusEffect(
        useCallback(() => {
            if (props?.isVerified === 1) return; // Stop polling if already verified

            const interval = setInterval(() => {
                updateUserData();
            }, 5000);

            return () => {
                clearInterval(interval); // Cleanup when screen is unfocused
            };
        }, [props?.isVerified, updateUserData])
    );
    const fetchAllClinics = async () => {
        await props.GetAllClinicAction(props.userId);
        // await props.GetAllClinicAction(25);
    }

    const setGlobalClinicId = async (obj) => {
        await props.UpdateClinicIdAction(obj);
    }

    const handleCloseBankModal = () => {
        setIsBankModalOpen(false)
    }

    useEffect(() => {
        if (props?.allClinics) {
            setSelectedClinicName(props?.allClinics[0].clinicName);
            setGlobalClinicId({
                ClinicId: props?.allClinics[0].id,
                ClinicName: props?.allClinics[0].clinicName,
            })
        }
    }, [])

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={HomeStyles.background}
            resizeMode="cover"
        >
            <PaperProvider>

                <View style={HomeStyles.topView}>
                    <View style={HomeStyles.header}>
                        <View style={HomeStyles.buttonHeader}>

                            <View style={
                                [
                                    HomeStyles.buttonContainer,
                                    {
                                        justifyContent: !props.individual ?
                                            'space-between'
                                            :
                                            'flex-end'
                                    }
                                ]
                            }>
                                {
                                    !props.individual &&
                                    <View style={{}}>
                                        <Menu
                                            visible={menuVisible}
                                            onDismiss={closeMenu}
                                            anchor={
                                                <Pressable
                                                    style={HomeStyles.dropdownContainer}
                                                    onPress={openMenu}
                                                >
                                                    <Image
                                                        source={Images.icon_hospital}
                                                        style={HomeStyles.iconStyle}
                                                    />
                                                    <Text
                                                        style={HomeStyles.speciality}>
                                                        {selectedClinicName}
                                                    </Text>
                                                    <Image
                                                        source={Images.icon_dropdown3}
                                                        style={HomeStyles.iconStyle}
                                                    />
                                                </Pressable>
                                            }
                                            anchorPosition='top'
                                        >
                                            {props?.allClinics?.map((clinic) => (
                                                <Menu.Item
                                                    key={clinic.id}
                                                    onPress={() => {
                                                        setSelectedClinicName(clinic.clinicName);
                                                        closeMenu();
                                                        setGlobalClinicId({
                                                            ClinicId: clinic.id,
                                                            ClinicName: clinic.clinicName,
                                                        })
                                                    }}
                                                    title={clinic.clinicName}
                                                    style={HomeStyles.dropdownContainer2}
                                                    titleStyle={HomeStyles.speciality2}
                                                    contentContainerStyle={{ backgroundColor: 'red' }}
                                                />
                                            ))}
                                        </Menu>
                                    </View>
                                }

                                <View style={HomeStyles.buttonSubContainer}>


                                    <TouchableOpacity style={HomeStyles.chatButtonContainer}>
                                        <Image
                                            source={Images.icon_chat}
                                            style={HomeStyles.iconStyle}
                                        />
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={HomeStyles.notificationButtonContainer}
                                        // onPress={() => props.navigation.navigate("NotificationScreen")}
                                        onPress={() => console.log('Notification')}
                                    >
                                        <Image
                                            source={Images.icon_notification}
                                            style={HomeStyles.iconStyle}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                        <View style={HomeStyles.textHeader}>
                            <Text style={HomeStyles.textHeaderContent}>{t('HopeYoureFeelingWellToday')}</Text>
                        </View>
                    </View>
                    <View style={HomeStyles.details}>
                        <View style={HomeStyles.textContainer}>
                            <Text style={HomeStyles.doctorName}>{t('DrWilliamJhonon')}</Text>
                            <View style={HomeStyles.specialityContainer}>
                                <Text style={HomeStyles.speciality}>{t('Dentist')}</Text>
                            </View>
                        </View>
                        <Image source={Images.doctor2} style={HomeStyles.doctorImage} />
                    </View>
                </View>



                <View style={HomeStyles.bottomView}>
                    <FloatingBackgroundCard customStyles={HomeStyles.customStyles}>
                        {props.isVerified === 1 ?
                            <View>
                                <View style={HomeStyles.dashboardtextContainer}>
                                    <Text style={HomeStyles.dashboardtext}>{t('Dashboard')}</Text>
                                </View>
                                <View style={HomeStyles.dashboardItemContainer}>
                                    <View style={HomeStyles.dashboardBox}>

                                        <View style={HomeStyles.dashboardBoxTitleContainer}>
                                            <View style={HomeStyles.dashboardBoxIconContainer}>
                                                <Image source={Images.icon_firstAddBox} style={HomeStyles.firstAddBoxIcon} />
                                            </View>
                                            <Text style={HomeStyles.boxHeadingText}>{t('Consultations')}</Text>
                                        </View>

                                        <View style={HomeStyles.dashboardUnderBox}>
                                            <View style={[HomeStyles.totalArea, { borderRightWidth: 0.5, width: '40%', }]}>
                                                <Text style={HomeStyles.totalText}>{t('Total')}</Text>
                                                <Text style={HomeStyles.totalValue}>{t('FiftySix')}</Text>
                                            </View>
                                            <View style={[HomeStyles.totalArea, { borderLeftWidth: 0.5, width: '60%', }]}>
                                                <Text style={HomeStyles.totalText}>{t('Completed')}</Text>
                                                <Text style={HomeStyles.totalValue}>{t('FiftySix')}</Text>
                                            </View>
                                        </View>

                                        <CustomButton
                                            title={t('ViewMore')}
                                            width='100%'
                                            height={'15%'}
                                            textStyle={HomeStyles.buttonTextStyle}
                                            type={'home'}
                                        />
                                    </View>
                                    <View style={HomeStyles.dashboardBox}>

                                        <View style={HomeStyles.dashboardBoxTitleContainer}>
                                            <View style={HomeStyles.dashboardBoxIconContainer}>
                                                <Image source={Images.icon_chat2} style={HomeStyles.firstAddBoxIcon} />
                                            </View>
                                            <Text style={HomeStyles.boxHeadingText}>{t('Chat')}</Text>
                                        </View>

                                        <View style={HomeStyles.dashboardUnderBox}>
                                            <View style={[HomeStyles.totalArea, { borderRightWidth: 0.5, width: '40%', }]}>
                                                <Text style={HomeStyles.totalText}>{t('Total')}</Text>
                                                <Text style={HomeStyles.totalValue}>{t('FiftySix')}</Text>
                                            </View>
                                            <View style={[HomeStyles.totalArea, { borderLeftWidth: 0.5, width: '60%', }]}>
                                                <Text style={HomeStyles.totalText}>{t('New')}</Text>
                                                <Text style={HomeStyles.totalValue}>{t('FiftySix')}</Text>
                                            </View>
                                        </View>

                                        <CustomButton
                                            title={t('ViewMore')}
                                            width='100%'
                                            height={'15%'}
                                            textStyle={HomeStyles.buttonTextStyle}
                                            type={'home'}
                                        />
                                    </View>
                                </View>
                            </View>
                            :
                            props.isVerified === 2 ?
                                <View style={HomeStyles.card}>
                                    <Image
                                        source={Images.documents}
                                        style={HomeStyles.cardImage}
                                    />
                                    <Text
                                        style={HomeStyles.text}
                                    >{t('YourAccountHasYetToBeVerified')}</Text>
                                </View>
                                :
                                props.isVerified === 3 ?
                                    <ScrollView contentContainerStyle={HomeStyles.card2}>
                                        <Image
                                            source={Images.filenotfound}
                                            style={HomeStyles.cardImage2}
                                        />
                                        <Text
                                            style={HomeStyles.text2}
                                        >{t('ApplicationRejected')}</Text>
                                        <Text
                                            style={HomeStyles.resion}
                                        >{t('ApplicationRejectionReason')}</Text>
                                        <View style={HomeStyles.resiontextContainer}>
                                            <Text
                                                style={HomeStyles.resiontext}
                                            >{t('AdminWillGiveReason')}</Text>
                                        </View>
                                    </ScrollView>
                                    :
                                    props.isVerified === 4 ?
                                        <View style={HomeStyles.card} >
                                            <Image
                                                source={Images.handshake}
                                                style={HomeStyles.cardImage}
                                            />
                                            <Text
                                                style={HomeStyles.text}
                                            >{t('PleaseAddYourBankInformationAndContract')}</Text>
                                            <CustomButton
                                                title={t('FinishSetup')}
                                                height={'16%'}
                                                width={'45%'}
                                                backgroundColor={Colors.lightblue3}
                                                textColor={Colors.blue}
                                                onPress={handleContractDetails}
                                            />
                                        </View>
                                        :
                                        <View style={HomeStyles.card}>
                                            <Image
                                                source={Images.documents}
                                                style={HomeStyles.cardImage}
                                            />
                                            <Text
                                                style={HomeStyles.text}
                                            >{t('ContractNotVerified')}</Text>
                                        </View>
                        }
                    </FloatingBackgroundCard>
                    <Loader
                        visible={props.updateLoading}
                    />
                    <BankModal
                        isModalOpen={isBankModalOpen}
                        onClose={handleCloseBankModal}
                        buttonOnpress={handleBankDetails}
                    />
                </View>
            </PaperProvider>
        </ImageBackground>

    );
};


const mapStateToProps = state => {
    return {
        isVerified: state.authReducer.isVerified,
        userData: state.authReducer.userData,
        GlobalSelectedClinicId: state.authReducer.selectedClinicId,
        GlobalSelectedClinicName: state.authReducer.selectedClinicName,
        // isVerified: 1, //  2-4-5-3/1  6 for bank 
        updateLoading: state.bankReducer.updateLoading,
        userId: state.authReducer.userId,
        individual: state.authReducer.individual,
        allClinics: state.getAllClinicReducer.data,

    };
};

const mapDispatchToProps = {
    UpdateUserInfo,
    GetAllClinicAction,
    UpdateClinicIdAction

};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);