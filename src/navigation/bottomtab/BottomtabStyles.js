import { StyleSheet } from 'react-native';
import { WindowWidth as wp, WindowHeight as hp, Colors, ResponsiveFont } from '../../assets';
export const BottomtabStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        borderWidth: (wp * 0.2) / 100,
        borderRadius: (wp * 4) / 100,
        borderColor: Colors.blue,
        width: '90%',
        alignSelf: 'center',
        height: (hp * 7) / 100, // consistent height for alignment
        backgroundColor: Colors.white, // optional
        // position: 'absolute', // prevents spacing issues
        bottom: 4, // adjust to your spacing needs
      },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: wp * 10 / 100,
        paddingLeft: wp * 2 / 100, // Add this
    },
    focusIndicator: {
        // width: (wp * 5) / 100,
        // height: 3, 
        // backgroundColor: Colors.blue,
        // borderRadius: 2, 
        // marginTop: 2,
    },
    iconStyle: {
        width: (wp * 10) / 100,
        height: (wp * 10) / 100,
        resizeMode: 'contain'
    }
});