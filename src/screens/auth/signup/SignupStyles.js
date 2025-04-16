import { StyleSheet } from 'react-native';
import { WindowWidth as wp, Colors, ResponsiveFont, Fonts } from '../../../assets';
export const SignupStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    pageContainer: {
        flexDirection: 'row',
        paddingVertical: wp * 2 / 100,
        alignItems: 'center',
        width: '100%',
        justifyContent: "flex-start"

    },
    pageName: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(20),
    },
    headingName: {
        width: '50%',
    },
    progressBarContainer: {
        width: '100%',
        paddingHorizontal: wp * 0.5 / 100,
        marginVertical: (wp * 1) / 100
    },
    progressBar: {
        height: 3.5,
        borderRadius: 4
    },
    iconContainer: {
        flexDirection: "row",
        // alignItems:'center',
        paddingVertical: wp * 3 / 100,
        justifyContent: 'flex-start'
    },
    iconStyle: {
        resizeMode: 'contain',
        width: (wp * 5.5) / 100,
        height: (wp * 5.5) / 100
    },
    termText: {
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(14),
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
        width: '85%',
        marginLeft: '2%'


    },
    bottomView: {
        flex: 9.95,
        width: '100%',
        paddingVertical: wp * 4 / 100,
        // justifyContent:'space-between'
    },
    label: {
        marginTop: '3%',
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '2%',
        marginBottom: '4%',

    },
    selectGender: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        borderRadius: wp*4/100,
        backgroundColor: Colors.light_gray,
       
    },
    selectedGender: {
        backgroundColor: Colors.lightblue5,
        fontFamily: Fonts.Bold,
        fontSize: ResponsiveFont(16),
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
      },
      icon: {
        width: wp*5/100,
        height: wp*5/100,
        marginBottom: '2%',
      },
      genderText: {
        fontSize: ResponsiveFont(16),
        fontFamily: Fonts.Bold,
        lineHeight: ResponsiveFont(20),
        color: Colors.black,
        marginLeft:'2%'
      },
});
