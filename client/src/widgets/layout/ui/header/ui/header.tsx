import { Layout, List } from 'antd';
import { LanguageSelector } from 'entities/language-selector';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogoutButton } from 'shared/ui/logout-button/logout-button';
import useLoginStore from 'features/login-forms/model/login.store';
import { getProfileLinks } from 'shared/ui/profile-card';
import { EnumRoutesName } from 'shared/config';

export const Header = () => {
  const [tCommon] = useTranslation('common');
  const isLogin = useLoginStore((state) => state.isLogin);
  const role = useLoginStore((state) => state.role);

  return (
    <StyledHeader>
      <StyledContent>
        <Link to={EnumRoutesName.MAIN}>{tCommon('Главная')}</Link>
        {role === 'Customer' && (
          <Link to={EnumRoutesName.PROFILE_CUSTOMER}>{tCommon('Профиль покупателя')}</Link>
        )}
        {role === 'Vendor' && <Link to={EnumRoutesName.PROFILE_VENDOR}>{tCommon('Профиль продавца')}</Link>}
        <List
          dataSource={getProfileLinks(tCommon)}
          renderItem={(route) => (
            <List.Item>
              <Link to={route.url}>{route.label}</Link>
            </List.Item>
          )}
        />
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
  justify-content: space-between;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
`