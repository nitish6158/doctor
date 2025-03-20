import Toast from 'react-native-simple-toast';

export const ToastMsg = (message, position) => {
  if (position == 'center') {
    Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
  } else if (position == 'top') {
    Toast.showWithGravity(message, Toast.LONG, Toast.TOP);
  } else if (position == 'bottom') {
    Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
  } else if (position == 'long') {
    Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
  }
};


