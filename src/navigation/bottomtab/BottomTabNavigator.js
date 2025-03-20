import React from 'react';
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import HomeScreen from '../../screens/tabs/home/HomeScreen';
import AppointmentScreen from '../../screens/tabs/appointment/AppointmentScreen';
import AgendaScreen from '../../screens/tabs/agenda/AgendaScreen';
import MatchingScreen from '../../screens/tabs/matching/MatchingScreen';
import ProfileScreen from '../../screens/tabs/profile/ProfileScreen';

import { BottomtabStyles } from './BottomtabStyles';
import { Images } from '../../assets';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: BottomtabStyles.tabBarStyle,
        tabBarIcon: ({ focused }) => {
          const icons = {
            HomeScreen: focused ? Images.icon_home_enable : Images.icon_home_disable,
            AppointmentScreen: focused ? Images.icon_appointment_enable : Images.icon_appointment_disable,
            AgendaScreen: focused ? Images.icon_agenda_enable : Images.icon_agenda_disable,
            MatchingScreen: focused ? Images.icon_matching_enable : Images.icon_matching_disable,
            ProfileScreen: focused ? Images.icon_profile_enable : Images.icon_profile_disable,
          };
          return (
            <View style={BottomtabStyles.iconContainer}>
              <Image
                source={icons[route.name]}
                style={BottomtabStyles.iconStyle}
              />
              {focused &&
                <View style={BottomtabStyles.focusIndicator}></View>
              }
            </View>
          );
        },
        tabBarShowLabel: false,
        animationEnabled: false,
        tabBarHideOnKeyboard: true,
      })}

    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Tab.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Tab.Screen name="AgendaScreen" component={AgendaScreen} />
      <Tab.Screen name="MatchingScreen" component={MatchingScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
