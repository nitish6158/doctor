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
import { useSelector } from 'react-redux';

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
        <Stack.Screen name="OnboardingLanguageScreen" component={OnboardingLanguageScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        <Stack.Screen name="BankFormScreen" component={BankFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;