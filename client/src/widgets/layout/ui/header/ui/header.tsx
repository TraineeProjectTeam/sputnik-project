import { Button, List } from 'antd';
import { LanguageSelector } from 'entities/language-selector';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginStore } from 'features/login-forms';
import { getProfileLinks } from 'shared/ui/profile-card';
import Cookies from 'js-cookie';
import { EnumRoutesName } from 'shared/config';
import { StyledContent, StyledHeader } from './header.styles';

export const Header = () => {
  const [tCommon] = useTranslation('common');
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
    navigate('/');
    setIsLogin(false);
  };

  return (
    <StyledHeader>
      <StyledContent>
        <Link to={EnumRoutesName.MAIN}>{tCommon('Главная')}</Link>
        {isLogin && (
          <>
            {role === 'Customer' && (
              <Link to={EnumRoutesName.PROFILE_CUSTOMER}>{tCommon('Профиль покупателя')}</Link>
            )}
            {role === 'Vendor' && (
              <>
                <Link to={EnumRoutesName.PROFILE_VENDOR}>{tCommon('Профиль продавца')}</Link>
                <Link to={EnumRoutesName.PRODUCTS_VENDOR}>{tCommon('Товары')}</Link>
              </>
            )}
            <List
              dataSource={getProfileLinks(tCommon)}
              renderItem={(route) => (
                <List.Item>
                  <Link to={route.url}>{route.label}</Link>
                </List.Item>
              )}
            />
          </>
        )}
      </StyledContent>
      <StyledContent>
        <LanguageSelector />
        {isLogin ? (
          <Button onClick={onLogout}>{tCommon('Выйти')}</Button>
        ) : (
          <>
            <Link to={EnumRoutesName.LOGIN}>{tCommon('Войти')}</Link>
            <Link to={EnumRoutesName.REGISTER}>{tCommon('Зарегистрироваться')}</Link>
          </>
        )}
      </StyledContent>
    </StyledHeader>
  );
};
