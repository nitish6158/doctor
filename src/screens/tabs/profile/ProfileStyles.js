import { StyleSheet } from 'react-native';
import { WindowWidth as wp, Colors, Fonts, ResponsiveFont } from '../../../assets';
import { BottomTabView } from '@react-navigation/bottom-tabs';
export const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingHorizontal: '5%',
        paddingBottom: wp * 20 / 100,
    },
    buttonContainer: {
        width: "100%",
    },
    logoutButton: {
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.red,
        width: '30%',
        paddingVertical: '3%'
    },
    logoutText: {
        color: Colors.red2,
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(20),
        marginHorizontal: '5%',
    },
    menuItemcontainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: '1%'
    },
    menuItem: {
        flexDirection: 'row',
        width: '45%',
        paddingVertical: '1.5%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    menuText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
        marginHorizontal: '5%'

    },
    topView: {
        flex: 2,
        // backgroundColor:'red',
        width: '100%',
        paddingHorizontal: '6%',
        paddingVerticalZ: '3%',
        justifyContent: 'flex-end'
    },
    bottomView: {
        flex: 8,
        width: '100%',
    },
    profileCover: {
        width: (wp * 25) / 100,
        height: (wp * 25) / 100,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'green',
        // marginHorizontal:'8%',
        // marginVertical:'4%'
    },
    profileImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'cover',
        borderRadius: 100,
        borderColor: Colors.blue,
        borderWidth: 2,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    profileName: {
        color: Colors.black,
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        lineHeight: ResponsiveFont(34),
        // marginHorizontal:'8%'
    },
    profilePic: {
        width: wp * 20 / 100,
        height: wp * 20 / 100,
        borderRadius: wp * 15 / 100,
        borderWidth: 3,
        borderColor: Colors.blue,
    },
    editImageIcon: {
        position: 'absolute',
        right: 3,
        bottom: 2,
        backgroundColor: Colors.blue,
        borderRadius: 50,
        padding: 10,
        // paddingVertical:7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        // marginRight: 10,
    },
    textContainer: {
        flexDirection: 'row',
    },
    iconContainer: {
        backgroundColor: Colors.light_gray3,
        width: (wp * 8) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        borderRadius: (wp * 3) / 100,
    },
    iconstyle: {
        width: wp * 5 / 100,
        height: wp * 5 / 100
    },
    logoutIconstyle: {
        width: wp * 5 / 100,
        height: wp * 5 / 100,
    },
    editIconstyle: {
        width: wp * 4 / 100,
        height: wp * 4 / 100,
    },
    editIcon: {
        backgroundColor: Colors.blue,
        width: (wp * 6) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
        borderRadius: (wp * 18) / 100,
    }
});