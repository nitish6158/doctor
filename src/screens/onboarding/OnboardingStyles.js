import { StyleSheet } from 'react-native';
import { Colors, Fonts, ResponsiveFont } from '../../assets';

export const OnboardingStyles = StyleSheet.create({
    background: {
        flex: 1,
        width:'100%',
        height:'100%',
    },
    container:{
        flex:1,
    },
    topSection: {
        flex: 4,
        justifyContent: "flex-end", 
        alignItems: "center",
    },
    doctorImage: {
        width: '85%', 
        height: '85%',
        resizeMode: 'contain',
    },
    bottomSection: {
        flex: 6, // 60% of the screen
    },
    textArea:{
        flex: 1, // 50% of the screen
        width:'100%',
        // backgroundColor:'green'
    },
    buttonArea:{
        flex: 1, // 50% of the screen
        width:'100%',
        alignItems:'center',
    },
    textContainer1:{
        flex: 1, // 50% of the screen
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    textContainer2:{
        flex: 1, // 50% of the screen
        width:'100%',
    alignItems:'center'
    
    },
    textContent: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: ResponsiveFont(26),
        lineHeight:ResponsiveFont(30),
        fontFamily: Fonts.Bold,
        color: Colors.font_blue,

    },
    subtitle: {
        fontSize: ResponsiveFont(27),
        lineHeight:ResponsiveFont(42.16),
        fontFamily: Fonts.Bold,
        color: Colors.font_blue,
        textAlign:'center'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    registerButton: {
        borderWidth: 1,
        borderColor: '#007AFF',
        paddingVertical: 12,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
    },
    registerText: {
        color: '#007AFF',
        fontSize: 16,
    },
});
