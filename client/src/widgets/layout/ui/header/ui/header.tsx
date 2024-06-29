import { Button, Layout } from "antd";
import { routes } from "app/router";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCurrentLanguage } from "shared/lib";
import styled from "styled-components";

export const Header = () => {
  const { i18n, t } = useTranslation(['user', 'common'])
  const lang = useCurrentLanguage()

  const onClickChangeLanguageHandler = () => {
    i18n.changeLanguage(lang === 'ru' ? 'en' : 'ru')
  }

  return (
    <StyledHeader>
      <Link to={routes.main}>Main</Link>
      <Link to={routes.profile_customer}>{t('user:profile_customer')}</Link>
      <Link to={routes.profile_vendor}>{t('user:profile_vendor')}</Link>
      <div >
        <Button onClick={onClickChangeLanguageHandler}>Change lang</Button>
        {t('common:test')}
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled(Layout.Header)`
  height: 3.75rem;
  background-color: var(--main-background-color);
  display: flex;
  column-gap: 0.75rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
`;