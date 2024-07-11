import { Layout } from 'antd';
import { routes } from 'app/router';
import { LanguageSelector } from 'entities/language-selector';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogoutButton } from 'shared/ui/logout-button/logout-button';
import useLoginStore from 'features/login-forms/model/login.store';

export const Header = () => {
  const [tCommon] = useTranslation('common');
  const [tUser] = useTranslation('user');
  const isLogin = useLoginStore((state) => state.isLogin);
  const role = useLoginStore((state) => state.role);

  return (
    <StyledHeader>
      <Link to={routes.main}>Main</Link>
      {isLogin ? (
        <>
          {role === 'Customer' && (
            <Link to={routes.profile_customer}>{tUser('Профиль покупателя')}</Link>
          )}
          {role === 'Vendor' && <Link to={routes.profile_vendor}>{tUser('Профиль продавца')}</Link>}
          <LogoutButton />
        </>
      ) : (
        <>
          <Link to={routes.login}>{tCommon('Войти')}</Link>
          <Link to={routes.register}>{tCommon('Зарегистрироваться')}</Link>
        </>
      )}
      <div>
        <LanguageSelector />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled(Layout.Header)`
  height: var(--header-height);
  background-color: var(--main-background-color);
  display: flex;
  column-gap: 0.75rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: var(--header-z-index);
  align-items: center;
`;
