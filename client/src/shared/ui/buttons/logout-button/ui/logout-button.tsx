import { Button } from 'antd';
import { useLoginStore } from 'features/login-forms';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const clearUserStores = useLoginStore((state) => state.clearUserStores);

  const onLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('role');
    Cookies.remove('user');
    clearUserStores();
    navigate('/');
    setIsLogin(false);
  };

  return <Button onClick={onLogout}>{t('Выйти')}</Button>;
};
