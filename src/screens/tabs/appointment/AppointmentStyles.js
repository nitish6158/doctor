import { WindowWidth as wp, Colors, ResponsiveFont, Fonts } from '../../../assets';
import { StyleSheet } from 'react-native';

export const AppointmentStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    topView: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
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
    tabContainer: {
        flexDirection: "row",
        flex: 1.5,
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 8.5,
        width: '100%',
    },
    tabButton: {
        paddingVertical: '3.5%',
        paddingHorizontal: '7%',
        borderRadius: (wp * 6) / 100,
        backgroundColor: Colors.light_gray,
        margin: '1%'
    },
    activeTab: {
        backgroundColor: Colors.font_blue
    },
    tabText: {
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(17),
        color: Colors.black,
    },
    activeTabText: {
        color: Colors.white,
        fontFamily: Fonts.SemiBold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(17),
    },
    detailContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.9,
        borderColor: Colors.blue,
        paddingVertical: '2%'
    },
    imageContainer: {

    },
    cardImage: {
        width: (wp * 30) / 100,
        height: wp * 30 / 100
    },
    details: {
        marginLeft: '5%',
        justifyContent: 'space-between',
        width: '60%'
    },
    buttonContainer: {
        marginVertical: '2%',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Name: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(17.5),
        color: Colors.black,
    },
    id: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(15),
        lineHeight: ResponsiveFont(18.2),
        color: Colors.light_black,
    },
    addressContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    flatlistStyle: {
        paddingBottom: wp * 20 / 100,
        alignItems: 'center',
    }
});