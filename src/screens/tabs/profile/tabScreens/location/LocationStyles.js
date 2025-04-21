import { StyleSheet } from 'react-native';
import { WindowWidth as wp, Colors, Fonts, ResponsiveFont } from '../../../../../assets';
export const LocationStyles = StyleSheet.create({
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
    tabNameContainer1: {
        width: '35%',
        alignItems: 'center',
        alignItems: 'flex-start'
    },
    tabContainer: {
        flexDirection: "row",
        flex: 1.5,
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
    },
    backIcon: {
        resizeMode: 'contain',
        width: wp * 5 / 100,
        height: wp * 5 / 100,
        marginLeft: '10%',
    },
    title: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        color: Colors.black,

    },
    card1: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: wp*90/100,
    },
    firstBox: {
        width: wp * 10 / 100,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal:'2%',
   },
    icon: {
        width: wp * 4 / 100,
        height: wp * 4 / 100,
        resizeMode: 'contain'
    },
    ButtonParent: {
        width: wp * 10 / 100,

    },
    ButtonContainer: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.light_blue2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: (wp * 2.5) / 100,
        borderRadius: (wp * 3) / 100,
        // width:'5%'
    },
    ButtonStyle: {
        backgroundColor: Colors.blue,
        width: '90%',
        paddingVertical: '4%',
        borderRadius: wp * 4 / 100,
        marginBottom: '10%',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(18),
        color: Colors.white,
    },
    buildingName: {
        fontSize: ResponsiveFont(14),
        color: Colors.gray,
        textAlign: 'left',
        width: '65%',
    },
    NoDataFoundContainer: {
        paddingVertical: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    NoDataFound: {
        width: wp * 40 / 100,
        height: wp * 40 / 100,
        resizeMode: 'contain'
    },
    locationText: {
        width: wp * 67 / 100,
        paddingHorizontal: '2%',

    }
});