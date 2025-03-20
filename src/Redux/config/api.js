import axios from 'axios';
import {store} from './index';
export const contentType = 'application/json';
export function apiConfig(headerValue) {
  const url = axios.create({
    headers: apiHeaders(headerValue),
  
  });
  return url;
}

export const ApiHandler = async ({endPoint, method, reqParam,headerValue}) => {
  const response = await apiConfig(headerValue)[method](endPoint, reqParam);
  return response;
};

export function apiHeaders(headerValue = 0) {
  const state = store.getState();
  let contentType = 'application/json';
  if (headerValue == 1) {
    contentType = 'multipart/form-data';
  }
  const headers = {
    'Content-Type': contentType,
    Authorization: state.authReducer.authToken
      ? "Bearer "+ state.authReducer.authToken
      : '',
  };
  return headers;
}
