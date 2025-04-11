import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../assets';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import OnboardingLanguageScreen from '../screens/onboarding/OnboardingLanguageScreen';
import BottomTabNavigator from './bottomtab/BottomTabNavigator';
import BankFormScreen from '../screens/container/bankDetailsForm/BankFormScreen';
import NotificationScreen from '../screens/container/notification/NotificationScreen';
import { useSelector } from 'react-redux';
import ContractScreen from '../screens/container/contract/ContractScreen';
import LocationScreen from '../screens/container/profileTabScreens/location/LocationScreen';
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
        <Stack.Screen
          name="BankFormScreen"
          component={BankFormScreen}
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          name="ContractScreen"
          component={ContractScreen}
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;