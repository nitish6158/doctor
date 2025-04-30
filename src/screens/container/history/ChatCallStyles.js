import { WindowWidth as wp, Colors, ResponsiveFont, Fonts } from '../../../assets';
import { StyleSheet } from 'react-native';

export const ChatCallStyles = StyleSheet.create({
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
        alignItems: 'flex-start',
    },
    tabNameContainer1: {
        width: '35%',
        alignItems: 'center',
        alignItems: 'flex-start',
    },
    backIcon: {
        resizeMode: 'contain',
        width: wp * 5 / 100,
        height: wp * 5 / 100,
        marginLeft: '10%',
    },
    tabRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: wp * 3 / 100,
    },
    tabButton: {
        paddingVertical: wp * 3 / 100,
        paddingHorizontal: wp * 6 / 100,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        flex: 1,
        alignItems: 'center'
    },
    activeTab: {
        borderBottomColor: Colors.blue,
    },

    tabText: {
        fontSize: ResponsiveFont(16),
        color: Colors.gray,
        fontFamily: Fonts.Bold,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp * 90 / 100,
        // justifyContent:'center',
        alignSelf: 'center'
    },
    profileImage: {
        width: wp * 12 / 100,
        height: wp * 12 / 100,
        borderRadius: wp * 2 / 100,
        marginRight: wp * 4 / 100,
    },
    textContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: ResponsiveFont(16),
        fontFamily: Fonts.Bold,
        color: Colors.black,
    },
    subText: {
        fontSize: ResponsiveFont(12),
        color: Colors.gray,
        marginTop: 2,
    },
    iconWrapper: {
        padding: wp * 3 / 100,
    },
    icon: {
        width: wp * 7 / 100,
        height: wp * 7 / 100,
        resizeMode: 'contain',
    },
    activeTabText: {
        color: Colors.blue,
    },
    customstyle: {
        alignContent: 'center'
    }
});