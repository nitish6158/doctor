//import liraries
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { ProfileStyles } from './ProfileStyles';
import { Images } from '../../../assets';
import { LogoutModal } from '../../../components/modal';
import { useTranslation } from '../../../components/customhooks';
import { connect } from 'react-redux';
// import { LogoutAction } from '../../../Redux/actions/auth';
import { LogoutAction } from '../../../Redux/actions';
const menuItems = [
    {
        icon: Images.user_icon_active,
        label: 'My Account',
        screenName:'AccountScreen',
    },
    {
        icon: Images.icon_select_contry_active,
        label: 'My Bank Details',
        screenName:'BankFormScreen',
    },
    {
        icon: Images.icon_location,
        label: 'My Location',
        screenName:'LocationScreen'
    },
    {
        icon: Images.icon_star,
        label: 'My Rating',
        screenName:'',

    },
    {
        icon: Images.icon_contract,
        label: 'My Contract',
        screenName:'',

    },
    {
        icon: Images.icon_payment,
        label: 'Payments',
        screenName:'',

    },
    {
        icon: Images.icon_notification2,
        label: 'Notification',
        screenName:'',

    },
    {
        icon: Images.icon_language,
        label: 'Language',
        screenName:'',

    },
    {
        icon: Images.icon_lock,
        label: 'Security',
        screenName:'',

    },
    {
        icon: Images.icon_about,
        label: 'About',
        screenName:'',

    },
    {
        icon: Images.icon_logout,
        label: 'Logout',
        isLogout: true,
        screenName:'',

    }

];


const ProfileScreen = (props) => {
    const t=useTranslation();
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const handleLogoutPress = () => {
        setLogoutModalVisible(!isLogoutModalVisible);
    };

    const handleCancelLogout = () => {
        setLogoutModalVisible(false);
    };

    const handleConfirmLogout =async () => {
        await props.LogoutAction();
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
                onPress={()=>{
                    if(item.screenName != ''){
                        props.navigation.navigate(item.screenName)
                    }
                }}
                 style={ProfileStyles.menuItem}>
                    <View style={ProfileStyles.iconContainer}>
                        <Image
                            source={item.icon}
                            style={ProfileStyles.iconstyle}
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
                    <ImageBackground
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
                    </ImageBackground>

                </ImageBackground>
                <View style={ProfileStyles.textContainer}>
                    <Text  style={ProfileStyles.profileName}>{t('DoctorTitle')}</Text>
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
    };
};

const mapDispatchToProps = {
    LogoutAction
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);