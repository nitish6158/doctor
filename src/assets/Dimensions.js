import { Dimensions} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const opacityOfButton = 0.7;

export const WindowWidth = Dimensions.get('window').width;
export const WindowHeight = Dimensions.get('window').height;

export const ResponsiveFont = size => {
  return RFValue(size, WindowHeight);
};

export const buttonTextSize = ResponsiveFont(18);
export const headingTextSize = ResponsiveFont(17);
export const inputTextSize = ResponsiveFont(15);
export const numberTextSize = ResponsiveFont(15);


