import {
  AUTH,
} from '../../config';

export const ImageAction = data => {
  return async (dispatch, getState) => {
    dispatch({
        type: AUTH.SET_IMAGE,
        payload: data,
      });
  };
};
