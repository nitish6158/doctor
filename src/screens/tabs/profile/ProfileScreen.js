//import liraries
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { ProfileStyles } from './ProfileStyles';
import { Images } from '../../../assets';
import { LogoutModal } from '../../../components/modal';
import { useTranslation } from '../../../components/customhooks';
import { connect } from 'react-redux';
// import { LogoutAction } from '../../../Redux/actions/auth';
import { ClearMatchingReducer, LogoutAction } from '../../../Redux/actions';
import { ToastMsg } from '../../../components/Toast';
import { FILE_BASE_URL } from '../../../Redux/config';

const ProfileScreen = (props) => {
    const t = useTranslation();
    const menuItems = [
        {
            icon: Images.user_icon_active,
            label: t('MyAccount'),
            screenName: 'AccountScreen',
            isProtected: true
        },
        {
            icon: Images.icon_select_contry_active,
            label: t('MyBankDetails'),
            screenName: 'BankFormScreen',
            isProtected: true
        },
        {
            icon: Images.icon_location,
            label: t('MyLocation'),
            screenName: 'LocationScreen',
            isProtected: true
    
        },
        {
            icon: Images.icon_star,
            label: t('MyRating'),
            screenName: 'RatingScreen',
            isProtected: true
    
        },
        {
            icon: Images.icon_contract,
            label: t('MyContract'),
            screenName: 'ContractScreen',
            isProtected: true
    
        },
        {
            icon: Images.icon_payment,
            label:t('Payments'),
            screenName: '',
            isProtected: true
    
    
        },
        {
            icon: Images.icon_notification2,
            label: t('Notification'),
            screenName: 'NotificationScreen',
            isProtected: true
    
    
        },
        {
            icon: Images.icon_language,
            label: t('Language'),
            screenName: 'LanguageScreen',
            isProtected: true
    
    
        },
        {
            icon: Images.icon_lock,
            label: t('Security'),
            screenName: 'ChangePasswordScreen',
            isProtected: true
    
    
        },
        {
            icon: Images.icon_about,
            label: t('About'),
            screenName: 'AboutScreen',
            isProtected: true
    
    
        },
        {
            icon: Images.icon_logout,
            label: t('Logout'),
            isLogout: true,
            screenName: '',
            isProtected: false
        }
    
    ];
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const handleLogoutPress = () => {
        setLogoutModalVisible(!isLogoutModalVisible);
    };

    const handleCancelLogout = () => {
        setLogoutModalVisible(false);
    };

    const handleConfirmLogout = async () => {
        await props.LogoutAction();
        await props.ClearMatchingReducer();
        setLogoutModalVisible(false);
        props.navigation.navigate('OnboardingScreen')
    };

    const renderItem = ({ item }) => (
        item?.isLogout ?
            <View style={ProfileStyles.buttonContainer}>
                <TouchableOpacity style={ProfileStyles.logoutButton} onPress={handleLogoutPress}>
                    <Text style={ProfileStyles.logoutText}>{t('Logout')}</Text>
                    <Image
                        source={item.icon}
                        style={ProfileStyles.logoutIconstyle}
                    />
                </TouchableOpacity>
            </View>
            :
            <View style={ProfileStyles.menuItemcontainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (item?.isProtected && props?.isVerified != 1 && !item.isLogout) {
                            ToastMsg(t('AccessDeniedFeature'), 'bottom')
                        } else if (item.screenName != '') {
                            props.navigation.navigate(item.screenName)
                        }
                    }}
                    style={ProfileStyles.menuItem}>
                    <View style={ProfileStyles.iconContainer}>
                        <Image
                            source={item.icon}
                            style={ProfileStyles.iconstyle}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={ProfileStyles.menuText}>{item.label}</Text>
                </TouchableOpacity>
            </View>
    )
    return (
        <View style={ProfileStyles.container}>

            <View style={ProfileStyles.topView}>
                <ImageBackground
                    source={Images.icon_profileBackground}
                    style={ProfileStyles.profileCover}
                    resizeMode='contain'
                >
                    {/* <ImageBackground
                        source={
                            {
                                uri: 'https://randomuser.mee/api/portraits/men/17.jpg'
                            }
                        }
                        style={ProfileStyles.profileImage}
                    >
                        <View style={ProfileStyles.editIcon}>
                            <Image
                                source={Images.icon_edit}
                                style={ProfileStyles.editIconstyle}
                            />
                        </View>
                    </ImageBackground> */}

                    <View style={{ position: 'relative' }}>
                        <Image
                            source={
                                props?.userData?.image && props?.userData?.image != ""
                                    ?
                                    {
                                        uri:
                                            FILE_BASE_URL + props?.userData?.image
                                    }
                                    : Images.user_icon_active
                            }
                            style={ProfileStyles.profilePic}
                        />
                    </View>

                </ImageBackground>
                <View style={ProfileStyles.textContainer}>
                    <Text style={ProfileStyles.profileName}>{t('DoctorTitle')}</Text>
                    <Text style={ProfileStyles.profileName}> {props.firstName}</Text>
                    <Text style={ProfileStyles.profileName}> {props.lastName}</Text>
                </View>

            </View>

            <View style={ProfileStyles.bottomView}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.label}
                    renderItem={renderItem}
                    contentContainerStyle={ProfileStyles.listContainer}
                />
            </View>

            <LogoutModal
                isModalOpen={isLogoutModalVisible}
                onLogout={handleConfirmLogout}
                onClose={handleCancelLogout}
            />

        </View >
    );
};



const mapStateToProps = state => {
    return {
        userName: state.authReducer.userName,
        firstName: state.authReducer.firstName,
        lastName: state.authReducer.lastName,
        isVerified: state.authReducer.isVerified,
        userData: state.authReducer?.userData,

    };
};

const mapDispatchToProps = {
    LogoutAction,
    ClearMatchingReducer
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);