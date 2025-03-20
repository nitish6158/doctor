import { createStore, applyMiddleware,compose } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from '@redux-devtools/extension'
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise';
import {thunk} from 'redux-thunk';
import rootReducer from '../reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authReducer'],
  };
  const composerRelease = __DEV__
  ? composeWithDevTools(applyMiddleware(thunk, logger, promiseMiddleware))
  : applyMiddleware(thunk, promiseMiddleware);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(composerRelease));

const persistor = persistStore(store);

export {store, persistor};