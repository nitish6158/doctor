import { StyleSheet } from 'react-native';
import { WindowWidth as wp, WindowHeight as hp, Colors,ResponsiveFont} from '../../assets';
export const BottomtabStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle:{
        borderWidth:(wp*0.2)/100,
        borderRadius:(wp*4)/100,
        borderColor:Colors.blue,
        width:'90%',
        alignSelf:'center',
        bottom: 12
        // marginBottom:'1.5%'
    },
    iconContainer:{
       alignItems:'center',
       justifyContent:'center'
    },
    focusIndicator: {
        width: (wp * 5) / 100,
        height: 3, 
        backgroundColor: Colors.blue,
        borderRadius: 2, 
        marginTop: 2,
      },
    iconStyle:{
        width:(wp*6)/100,
        height:(hp*6)/100,
        resizeMode:'contain'
    }
});