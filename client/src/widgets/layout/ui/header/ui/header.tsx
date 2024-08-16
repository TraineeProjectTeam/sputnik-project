import { Button } from 'antd';
import { LanguageSelector } from 'entities/language-selector';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { EnumRoutesName } from 'shared/config';
import { StyledContent, StyledHeader } from './header.styles';
import { useLoginStore } from 'features/auth';

export const Header = () => {
  const { t } = useTranslation();
  const isLogin = useLoginStore((state) => state.isLogin);
  const role = useLoginStore((state) => state.role);
  const navigate = useNavigate();
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const clearUserStores = useLoginStore((state) => state.clearUserStores);

  const onLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('role');
    Cookies.remove('user');
    clearUserStores();
    navigate(EnumRoutesName.MAIN);
    setIsLogin(false);
  };

  return (
    <StyledHeader>
      <StyledContent>
        <Link to={EnumRoutesName.MAIN}>{t('Главная')}</Link>
        {isLogin && (
          <>
            {role === 'Customer' && (
              <Link to={EnumRoutesName.PROFILE_CUSTOMER}>{t('Профиль покупателя')}</Link>
            )}
            {role === 'Vendor' && (
              <>
                <Link to={EnumRoutesName.PROFILE_VENDOR}>{t('Профиль продавца')}</Link>
                <Link to={EnumRoutesName.PRODUCTS_VENDOR}>{t('Товары')}</Link>
              </>
            )}
            <Link to={EnumRoutesName.ORDERS}>{t('Заказы')}</Link>
          </>
        )}
      </StyledContent>
      <StyledContent>
        <LanguageSelector />
        {isLogin ? (
          <Button onClick={onLogout}>{t('Выйти')}</Button>
        ) : (
          <>
            <Link to={EnumRoutesName.LOGIN}>{t('Войти')}</Link>
            <Link to={EnumRoutesName.REGISTER}>{t('Зарегистрироваться')}</Link>
          </>
        )}
      </StyledContent>
    </StyledHeader>
  );
};
