import { Button } from 'antd';
import useLoginStore from 'features/login-forms/model/login.store';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const { t: tComm } = useTranslation('common')
  const navigate = useNavigate();
  const setIsLogin = useLoginStore((state) => state.setIsLogin);

  const onLogout = () => {
    Cookies.remove('access_token');
    navigate('/');
    setIsLogin(false);
  };

  return <Button onClick={onLogout}>{tComm('Выйти')}</Button>;
};
