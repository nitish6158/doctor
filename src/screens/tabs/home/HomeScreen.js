import React, { useEffect, useState } from 'react';
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
import { Loader } from '../../../components/modal';
import { Provider as PaperProvider } from 'react-native-paper';
import { Menu } from 'react-native-paper';
import { UpdateUserInfo, GetAllClinicAction } from '../../../Redux/actions'
const HomeScreen = (props) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState("Select Clinic");
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const t = useTranslation();
    const handleBankDetails = () => {
        props.navigation.navigate('BankFormScreen');
    }
    const handleContractDetails = () => {
        props.navigation.navigate('ContractScreen');
    }

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

    const updateUserData = async () => {
        await props.UpdateUserInfo(props.userId);
    }

    useEffect(() => {
        if (props?.isVerified !== 1) {
            updateUserData();
        }
        fetchAllClinics();

    }, [])

    const fetchAllClinics = async () => {
        await props.GetAllClinicAction(props.userId);
        // await props.GetAllClinicAction(25);
    }

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
                                        justifyContent: props.individual ? 'flex-end' : 'space-between'
                                    }
                                ]
                            }>
                                <View style={{ alignSelf: "stretch" }}>
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
                                                    {selectedClinic}
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
                                                    setSelectedClinic(clinic.clinicName);
                                                    closeMenu();
                                                }}
                                                title={clinic.clinicName}
                                                style={HomeStyles.dropdownContainer2}
                                                titleStyle={HomeStyles.speciality2}
                                                contentContainerStyle={{ backgroundColor: 'red' }}
                                            />
                                        ))}
                                    </Menu>
                                </View>
                                <View style={HomeStyles.buttonSubContainer}>


                                    <TouchableOpacity style={HomeStyles.chatButtonContainer}>
                                        <Image
                                            source={Images.icon_chat}
                                            style={HomeStyles.iconStyle}
                                        />
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={HomeStyles.notificationButtonContainer}
                                        onPress={() => props.navigation.navigate("NotificationScreen")}
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
                                            >admin will give a resion</Text>
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
                                        props.isVerified === 5 ?
                                            <View style={HomeStyles.card}>
                                                <Image
                                                    source={Images.documents}
                                                    style={HomeStyles.cardImage}
                                                />
                                                <Text
                                                    style={HomeStyles.text}
                                                >{t('ContractNotVerified')}</Text>
                                            </View>
                                            :
                                            <View style={HomeStyles.card} >
                                                <Image
                                                    source={Images.handshake}
                                                    style={HomeStyles.cardImage}
                                                />
                                                <Text
                                                    style={HomeStyles.text}
                                                >please add bank details</Text>
                                                <CustomButton
                                                    title={t('FinishSetup')}
                                                    height={'16%'}
                                                    width={'45%'}
                                                    backgroundColor={Colors.lightblue3}
                                                    textColor={Colors.blue}
                                                    onPress={handleBankDetails}
                                                />
                                            </View>

                        }
                    </FloatingBackgroundCard>
                    <Loader
                        visible={props.updateLoading}
                    />
                </View>
            </PaperProvider>
        </ImageBackground>

    );
};


const mapStateToProps = state => {
    return {
        isVerified: state.authReducer.isVerified,
        // isVerified: 4, //  2-4-5-3/1  6 for bank 
        updateLoading: state.bankReducer.updateLoading,
        userId: state.authReducer.userId,
        // individual: state.authReducer.individual,
        individual: false,
        allClinics: state.getAllClinicReducer.data,


    };
};

const mapDispatchToProps = {
    UpdateUserInfo,
    GetAllClinicAction

};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);