import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { View } from 'react-native';
import { store, persistor } from './src/Redux/config';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import CustomStatusBar from './src/components/status_bar/CustomStatusBar';
if (__DEV__) {
  import('./ReactronConfig').then(() => console.log('Reactotron Configured'));
}

import SplashScreen from 'react-native-splash-screen';
import { StripeProvider } from '@stripe/stripe-react-native';

const SP_KEY="YOUR_KEY"
const SECRET_KEY="YOUR_SECRET_KEY"

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    console.log("splash")
  }, []);

  //console

  return (
    <StripeProvider
      publishableKey={SP_KEY}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CustomStatusBar />
          <View style={{ flex: 1 }}>
            <AppNavigator />
          </View>
        </PersistGate>
      </Provider>
    </StripeProvider>
  )
};

export default App;