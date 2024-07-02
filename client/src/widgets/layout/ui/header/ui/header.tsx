import { Layout } from "antd";
import { routes } from "app/router";
import { LanguageSelector } from "entities/language-selector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  const { t: tUsr } = useTranslation('user')

  return (
    <StyledHeader>
      <Link to={routes.main}>Main</Link>
      <Link to={routes.profile_customer}>{tUsr('Профиль покупателя')}</Link>
      <Link to={routes.profile_vendor}>{tUsr('Профиль продавца')}</Link>
      <div>
        <LanguageSelector />
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