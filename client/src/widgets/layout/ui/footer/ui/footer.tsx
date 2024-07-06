import { Layout } from 'antd';
import styled from 'styled-components';

export const Footer = () => {
  return <StyledFooter>Footer</StyledFooter>;
};

const StyledFooter = styled(Layout.Footer)`
  background-color: var(--main-background-color);
  z-index: var(--footer-z-index);
  height: var(--footer-height);
`;
