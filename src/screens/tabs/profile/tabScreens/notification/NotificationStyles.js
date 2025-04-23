import { WindowWidth as wp, Colors, ResponsiveFont, Fonts } from '../../../../../assets';
import { StyleSheet } from 'react-native';

export const NotificationStyles = StyleSheet.create({
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
        alignSelf:'center',
        paddingBottom:wp*20/100
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
    listItem: {
        flexDirection: 'row',
        // alignItems: 'center',
        width: '100%',
    },
    avatar: {
        width: wp * 10 / 100,
        height: wp * 10 / 100,
        borderRadius: wp * 2/ 100,
        resizeMode: 'contain',
        marginRight: '4%',
    },
    textContainer: {
        flex: 1,
    },
    userName: {
        fontSize: ResponsiveFont(14),
        fontFamily: Fonts.SemiBold,
        color: Colors.black,
    },
    starRow: {
        flexDirection: 'row',
        marginTop: wp*2/100,
    },
    starIcon: {
        width: wp * 4 / 100,
        height: wp * 4 / 100,
        marginRight: 2,
        resizeMode: 'contain',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: wp*90/100,
    },
    sectionHeader: {
        fontSize: ResponsiveFont(14),
        fontFamily: Fonts.SemiBold,
        color: Colors.black,
        marginVertical:'1.5%',
        marginLeft: wp * 1 / 100,
    },
    subText: {
        fontSize: ResponsiveFont(13),
        fontFamily: Fonts.Regular,
        color: Colors.gray,
        marginTop: wp * 1 / 100,
    },

});