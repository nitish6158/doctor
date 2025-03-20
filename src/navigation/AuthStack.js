import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/login/LoginScreen';
import SignupScreen from '../screens/auth/signup/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/forgotpassword/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/resetpassword/ResetPasswordScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
  </Stack.Navigator>
);

export default AuthStack;
