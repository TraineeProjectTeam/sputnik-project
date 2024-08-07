import { List } from 'antd';
import { LanguageSelector } from 'entities/language-selector';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLoginStore } from 'features/login-forms';
import { getProfileLinks } from 'shared/ui/profile-card';
import { EnumRoutesName } from 'shared/config';
import { LogoutButton } from 'shared/ui/buttons';
import { StyledContent, StyledHeader } from './header.styles';

export const Header = () => {
  const [tCommon] = useTranslation('common');
  const isLogin = useLoginStore((state) => state.isLogin);
  const role = useLoginStore((state) => state.role);

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
          <LogoutButton />
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
