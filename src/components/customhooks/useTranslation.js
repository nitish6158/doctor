import { useSelector } from 'react-redux';
import { Languages } from '../../utility/constant';
const useTranslation = () => {
  const appLanguage = useSelector(state => state.authReducer.appLanguage);

  return (key) => {
    return Languages[key]?.[appLanguage] || key;
  };
};

export default useTranslation;
