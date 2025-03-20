import {
  AUTH,
} from '../../config';

export const LanguageAction = data => {
  return async (dispatch, getState) => {
    dispatch({
        type: AUTH.SET_LANGUAGE,
        payload: data,
      });
  };
};
