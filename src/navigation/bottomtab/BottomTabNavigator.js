import React from 'react';
import { Image, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/tabs/home/HomeScreen';
import AppointmentScreen from '../../screens/tabs/appointment/AppointmentScreen';
import AgendaScreen from '../../screens/tabs/agenda/AgendaScreen';
import MatchingScreen from '../../screens/tabs/matching/MatchingScreen';
import ProfileScreen from '../../screens/tabs/profile/ProfileScreen';

import { BottomtabStyles } from './BottomtabStyles';
import { Images } from '../../assets';
import { ToastMsg } from '../../components/Toast';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ isVerified , individual}) => {
  const disabledTabs = ['AppointmentScreen', 'AgendaScreen', 'MatchingScreen', 'ProfileScreen'];

  const tabIcons = {
    HomeScreen: {
      active: Images.icon_home_enable,
      inactive: Images.icon_home_disable,
    },
    AppointmentScreen: {
      active: Images.icon_appointment_enable,
      inactive: Images.icon_appointment_disable,
    },
    AgendaScreen: {
      active: Images.icon_agenda_enable,
      inactive: Images.icon_agenda_disable,
    },
    MatchingScreen: {
      active: Images.icon_matching_enable,
      inactive: Images.icon_matching_disable,
    },
    ProfileScreen: {
      active: Images.icon_profile_enable,
      inactive: Images.icon_profile_disable,
    },
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: BottomtabStyles.tabBarStyle,
        tabBarShowLabel: false,
        animationEnabled: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          const icon = focused
            ? tabIcons[route.name].active
            : tabIcons[route.name].inactive;

          return (
            <View style={BottomtabStyles.iconContainer}>
              <Image source={icon} style={BottomtabStyles.iconStyle} />
              {/* {focused && <View style={BottomtabStyles.focusIndicator} />} */}
            </View>
          );
        },
        tabBarButton: (props) => {
          if ( !individual || ( isVerified == 1)) {
            return <TouchableOpacity {...props} />;
          }else{
            return (
              <TouchableOpacity
                onPress={() => ToastMsg('Access Denied, Your Profile is under review','bottom')}
                style={BottomtabStyles.iconContainer}
                activeOpacity={1}
              >
                {props.children}
              </TouchableOpacity>
            );
          }
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Tab.Screen name="AgendaScreen" component={AgendaScreen} />
      <Tab.Screen name="MatchingScreen" component={MatchingScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => ({
  isVerified: state.authReducer.isVerified,
  // isVerified: 3,
  individual: state.authReducer.individual,

});

export default connect(mapStateToProps)(BottomTabNavigator);



// import React from 'react';
// import { Image, View } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from 'react-native-vector-icons';
// import HomeScreen from '../../screens/tabs/home/HomeScreen';
// import AppointmentScreen from '../../screens/tabs/appointment/AppointmentScreen';
// import AgendaScreen from '../../screens/tabs/agenda/AgendaScreen';
// import MatchingScreen from '../../screens/tabs/matching/MatchingScreen';
// import ProfileScreen from '../../screens/tabs/profile/ProfileScreen';

// import { BottomtabStyles } from './BottomtabStyles';
// import { Images } from '../../assets';

// const Tab = createBottomTabNavigator();
// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeScreen"
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: BottomtabStyles.tabBarStyle,
//         tabBarIcon: ({ focused }) => {
//           const icons = {
//             HomeScreen: focused ? Images.icon_home_enable : Images.icon_home_disable,
//             AppointmentScreen: focused ? Images.icon_appointment_enable : Images.icon_appointment_disable,
//             AgendaScreen: focused ? Images.icon_agenda_enable : Images.icon_agenda_disable,
//             MatchingScreen: focused ? Images.icon_matching_enable : Images.icon_matching_disable,
//             ProfileScreen: focused ? Images.icon_profile_enable : Images.icon_profile_disable,
//           };
//           return (
//             <View style={BottomtabStyles.iconContainer}>
//               <Image
//                 source={icons[route.name]}
//                 style={BottomtabStyles.iconStyle}
//               />
//               {focused &&
//                 <View style={BottomtabStyles.focusIndicator}></View>
//               }
//             </View>
//           );
//         },
//         tabBarShowLabel: false,
//         animationEnabled: false,
//         tabBarHideOnKeyboard: true,
//       })}

//     >
//       <Tab.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//           gestureEnabled: false,
//         }}
//       />
//       <Tab.Screen name="AppointmentScreen" component={AppointmentScreen} />
//       <Tab.Screen name="AgendaScreen" component={AgendaScreen} />
//       <Tab.Screen name="MatchingScreen" component={MatchingScreen} />
//       <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;
