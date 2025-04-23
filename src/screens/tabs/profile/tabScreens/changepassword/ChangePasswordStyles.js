import { WindowWidth as wp, WindowHeight as hp, Colors, ResponsiveFont, Fonts } from '../../../../../assets';
import { StyleSheet } from 'react-native';

export const ChangePasswordStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    topView: {
        flex: 1.5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bottomView: {
        flex: 8.5,
    },
    tabName: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(50),
        color: Colors.white,
    },
    tabNameContainer: {
        width: '65%',
        alignItems: 'center',
        alignItems: 'flex-start'
    },
    listContainer: {
        // flex: 8.5,
        // width: '100%',
        alignSelf: 'center',
        paddingBottom: wp * 20 / 100
    },
    tabNameContainer1: {
        width: '35%',
        alignItems: 'center',
        alignItems: 'flex-start'
    },
    backIcon: {
        resizeMode: 'contain',
        width: wp * 5 / 100,
        height: wp * 5 / 100,
        marginLeft: '10%',
    },
    innerContent: {
        padding: wp * 5 / 100,
        alignItems: 'center'
    },
    lockImage: {
        width: wp * 25 / 100,
        height: wp * 25 / 100,
        resizeMode: 'contain',
        // marginBottom: wp * 3 / 100,
    },
    changePasswordText: {
        fontSize: ResponsiveFont(20),
        fontFamily: Fonts.Bold,
        color: Colors.black,
        marginBottom: wp * 5 / 100,
    },
    inputWrapper: {
        width: '100%',
        // position: 'relative',
        // justifyContent: 'center',
    },

});