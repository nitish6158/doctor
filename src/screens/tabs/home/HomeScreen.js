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
const HomeScreen = (props) => {
    const t = useTranslation();
    const [selected, setSelected] = useState("Advantal Clinic");
    const [open, setOpen] = useState(false);
    const [isBankDetailButtonShowing, setIsBankDetailButtonShowing] = useState(false);
    const handleBankDetails = () => {
        props.navigation.navigate('BankFormScreen');
    }
    const selectOption = (option) => {
        setSelected(option);
        setOpen(false);
    };



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

    return (
        <ImageBackground
            source={Images.backgroundImage}
            style={HomeStyles.background}
            resizeMode="cover"
        >
            <View style={HomeStyles.topView}>
                <View style={HomeStyles.header}>
                    <View style={HomeStyles.buttonHeader}>
                        <View style={HomeStyles.buttonContainer}>
                            <View>
                                <Pressable
                                    style={HomeStyles.dropdownContainer}
                                    onPress={() => setOpen(!open)}
                                >
                                    <Image
                                        source={Images.icon_hospital}
                                        style={HomeStyles.iconStyle}
                                    />
                                    <Text
                                        style={HomeStyles.speciality}>
                                        {t('advantalClinic')}
                                    </Text>
                                    <Image
                                        source={Images.icon_dropdown2}
                                        style={HomeStyles.iconStyle}
                                    />
                                </Pressable>

                                {open &&
                                    <Pressable
                                        onPress={() => selectOption("Option 1")}
                                        style={HomeStyles.dropdownOption}
                                    >
                                        <Image
                                            source={Images.icon_user_doctor}
                                            style={HomeStyles.iconStyle}
                                        />
                                        <Text
                                            style={[HomeStyles.speciality, { marginLeft: '7%' }]}>
                                            {t('Self')}
                                        </Text>
                                    </Pressable>
                                }
                            </View>

                            <View style={HomeStyles.buttonSubContainer}>


                                <TouchableOpacity style={HomeStyles.chatButtonContainer}>
                                    <Image
                                        source={Images.icon_chat}
                                        style={HomeStyles.iconStyle}
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity style={HomeStyles.notificationButtonContainer}>
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
                                            <Image source={Images.icon_firstAddBox} />
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
                                            <Image source={Images.icon_chat2} />
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
                                            onPress={handleBankDetails}
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
            </View>
        </ImageBackground>
    );
};


const mapStateToProps = state => {
    return {
        isVerified: state.authReducer.isVerified,
        // isVerified: 4, //  2-4-5-3/1
        updateLoading: state.bankReducer.updateLoading,

    };
};

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);