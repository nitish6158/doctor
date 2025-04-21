import React from 'react';
import { Image, View, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import { ToastMsg } from '../../components/Toast';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/tabs/home/HomeScreen';
import AppointmentScreen from '../../screens/tabs/appointment/AppointmentScreen';
import AgendaScreen from '../../screens/tabs/agenda/AgendaScreen';
import MatchingScreen from '../../screens/tabs/matching/MatchingScreen';
import ProfileScreen from '../../screens/tabs/profile/ProfileScreen';
import { useSelector } from 'react-redux';

import { BottomtabStyles } from './BottomtabStyles';
import { Colors, Images } from '../../assets';
import { WindowWidth as wp } from '../../assets';
const Tab = createBottomTabNavigator();

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

const TabBarIcon = ({ routeName, focused }) => (
  <Image
    source={focused ? tabIcons[routeName].active : tabIcons[routeName].inactive}
    style={{ width: 42, height: 42, resizeMode: 'contain' }}
  />
);

const BottomTabNavigator = ({ navigation }) => {
  const { isVerified, individual } = useSelector((state) => state.authReducer);

  const allowAccess = () => {
    if (!individual) return true;
    return isVerified === 1;
  };

  const protectedRoutes = ['AppointmentScreen', 'AgendaScreen', 'MatchingScreen', 'ProfileScreen'];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon routeName={route.name} focused={focused} />
        ),
        tabBarButton: (props) => {
          const isProtected = protectedRoutes.includes(route.name);
          return (
            <TouchableOpacity
              {...props}
              activeOpacity={0.8}
              onPress={() => {
                if (isProtected && !allowAccess()) {
                  ToastMsg(
                    'Access Denied, Your Profile is under review', 'bottom',
                    'bottom'
                  );
                  return;
                }
                props.onPress();
              }}
              style={styles.tabButton}
            />
          );
        },
        tabBarStyle: styles.tabBar,
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

const styles = StyleSheet.create({
  tabBar: {
    width: wp * 90 / 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.blue,
    backgroundColor: '#fff',
    borderRadius: 25,
    // height: 70,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.12,
    // shadowRadius: 5,
    // position: 'absolute',
    bottom: 5,
    // borderRadius:1,
    // left: 20,
    // right: 20,
    // elevation: 5,

  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;


// const mapStateToProps = (state) => ({
//   isVerified: state.authReducer.isVerified,
//   individual: state.authReducer.individual,
//   isVerified: 1,


// });

// export default connect(mapStateToProps)(BottomTabNavigator);






// import React from 'react';
// import { Image, View, TouchableOpacity, Alert } from 'react-native';
// import { connect } from 'react-redux';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeScreen from '../../screens/tabs/home/HomeScreen';
// import AppointmentScreen from '../../screens/tabs/appointment/AppointmentScreen';
// import AgendaScreen from '../../screens/tabs/agenda/AgendaScreen';
// import MatchingScreen from '../../screens/tabs/matching/MatchingScreen';
// import ProfileScreen from '../../screens/tabs/profile/ProfileScreen';

// import { BottomtabStyles } from './BottomtabStyles';
// import { Images } from '../../assets';
// import { ToastMsg } from '../../components/Toast';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = ({ isVerified , individual}) => {
//   const disabledTabs = ['AppointmentScreen', 'AgendaScreen', 'MatchingScreen', 'ProfileScreen'];

//   const tabIcons = {
//     HomeScreen: {
//       active: Images.icon_home_enable,
//       inactive: Images.icon_home_disable,
//     },
//     AppointmentScreen: {
//       active: Images.icon_appointment_enable,
//       inactive: Images.icon_appointment_disable,
//     },
//     AgendaScreen: {
//       active: Images.icon_agenda_enable,
//       inactive: Images.icon_agenda_disable,
//     },
//     MatchingScreen: {
//       active: Images.icon_matching_enable,
//       inactive: Images.icon_matching_disable,
//     },
//     ProfileScreen: {
//       active: Images.icon_profile_enable,
//       inactive: Images.icon_profile_disable,
//     },
//   };

//   return (
//     <Tab.Navigator
//       initialRouteName="HomeScreen"
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: BottomtabStyles.tabBarStyle,
//         tabBarShowLabel: false,
//         animationEnabled: false,
//         tabBarHideOnKeyboard: true,
//         tabBarIcon: ({ focused }) => {
//           const icon = focused
//             ? tabIcons[route.name].active
//             : tabIcons[route.name].inactive;

//           return (
//             <View style={BottomtabStyles.iconContainer}>
//               <Image source={icon} style={BottomtabStyles.iconStyle} />
//               {/* {focused && <View style={BottomtabStyles.focusIndicator} />} */}
//             </View>
//           );
//         },
//         tabBarButton: (props) => {
//           if ( !individual || ( isVerified == 1)) {
//             return <TouchableOpacity
//             style={BottomtabStyles.iconContainer}
//              {...props} />;
//           }else{
//             return (
//               <TouchableOpacity
//                 onPress={() => ToastMsg('Access Denied, Your Profile is under review','bottom')}
//                 style={BottomtabStyles.iconContainer}
//                 // activeOpacity={1}
//               >
//                 {props.children}
//               </TouchableOpacity>
//             );
//           }
//         },
//       })}
//     >
//       <Tab.Screen name="HomeScreen" component={HomeScreen} />
//       <Tab.Screen name="AppointmentScreen" component={AppointmentScreen} />
//       <Tab.Screen name="AgendaScreen" component={AgendaScreen} />
//       <Tab.Screen name="MatchingScreen" component={MatchingScreen} />
//       <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// const mapStateToProps = (state) => ({
//   isVerified: state.authReducer.isVerified,
//   individual: state.authReducer.individual,
//   isVerified: 1,


// });

// export default connect(mapStateToProps)(BottomTabNavigator);



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
