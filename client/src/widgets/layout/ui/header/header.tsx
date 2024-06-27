import { routes } from "app/router";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <StyledHeader>
      <Link to={routes.main}>Main</Link>
      <Link to={routes.profile_customer}>Profile customer</Link>
      <Link to={routes.profile_vendor}>Profile vendor</Link>
    </StyledHeader>
  )
}

const StyledHeader = styled(Header)`
  height: 4rem;
  background-color: #000;
  color: #fff;
  display: flex;
  column-gap: 0.75rem;
`;