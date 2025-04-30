import { StyleSheet } from 'react-native';


import { Colors, ResponsiveFont, Fonts,WindowWidth as wp } from '../../../../../assets';

export const BankFormStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    // topView: {
    //     flex: 1.5,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    topView: {
        flex: 1.5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bottomView: {
        flex: 8.5,
        width: '100%',
    },
    tabName: {
        fontFamily: Fonts.Medium,
        fontSize: ResponsiveFont(22),
        lineHeight: ResponsiveFont(50),
        color: Colors.white,
    },
    textStyle: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(50),
        color: Colors.black,
    },
    tabNameContainer1: {
        width: '20%',
        alignItems: 'center',
        alignItems: 'flex-start',
    },
    backIcon: {
        resizeMode: 'contain',
        width: wp * 5 / 100,
        height: wp * 5 / 100,
        // marginLeft: '10%',
    },
    tabNameContainer: {
        width: '65%',
        alignItems: 'center',
        alignItems: 'flex-start',
    },
});