import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../assets';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//auth
import AuthStack from './AuthStack';
//onboarding
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import OnboardingLanguageScreen from '../screens/onboarding/OnboardingLanguageScreen';
import BottomTabNavigator from './bottomtab/BottomTabNavigator';
// container flow screens
import ChatCallHistoryScreen from '../screens/container/history/ChatCallHistoryScreen';
// profile tab flow screen
import LocationScreen from '../screens/tabs/profile/tabScreens/location/LocationScreen';
import ContractScreen from '../screens/tabs/profile/tabScreens/contract/ContractScreen';
import BankFormScreen from '../screens/tabs/profile/tabScreens/bankDetailsForm/BankFormScreen';
import AccountScreen from '../screens/tabs/profile/tabScreens/account/AccountScreen';
import RatingScreen from '../screens/tabs/profile/tabScreens/rating/RatingScreen';
import NotificationScreen from '../screens/tabs/profile/tabScreens/notification/NotificationScreen';
import ChangePasswordScreen from '../screens/tabs/profile/tabScreens/changepassword/ChangePasswordScreen';
import LanguageScreen from '../screens/tabs/profile/tabScreens/language/LanguageScreen';
import AboutScreen from '../screens/tabs/profile/tabScreens/about/AboutScreen';

const Stack = createStackNavigator();
const AppNavigator = () => {
  const loginStatus = useSelector(state => state.authReducer.loginStatus);
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        if (loginStatus) {
          setInitialRoute('BottomTabNavigator');
        } else if (onboardingCompleted === 'true') {
          setInitialRoute('OnboardingScreen');
        } else {
          setInitialRoute('OnboardingLanguageScreen');
        }
      } catch (error) {
        console.log('Error retrieving onboarding status:', error);
        setInitialRoute('OnboardingLanguageScreen');
      }
    };

    checkOnboardingStatus();
  }, [loginStatus]);

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.white },
      }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen
          name="OnboardingLanguageScreen"
          component={OnboardingLanguageScreen}
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />

        {/* // container flow screens */}
        <Stack.Screen
          name="BankFormScreen"
          component={BankFormScreen}
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="ContractScreen"
          component={ContractScreen}
        />
        <Stack.Screen
          name="ChatCallHistoryScreen"
          component={ChatCallHistoryScreen}
        />

        {/* // profile tab flow screen */}
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
        />
        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name="LanguageScreen"
          component={LanguageScreen}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;