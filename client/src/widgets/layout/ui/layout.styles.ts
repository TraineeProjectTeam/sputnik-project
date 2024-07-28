import { Layout } from 'antd';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 7.8125rem);
  @-moz-document url-prefix() {
    scrollbar-color: var(--main-background-color) var(--main-scrollbar-background-color);
    scrollbar-width: thin;
  }
`;

export const StyledContent = styled(Layout.Content)`
  padding: 2.5rem;
  max-width: 78rem;
  margin: 0 auto;

  @media (max-width: 48rem) {
    padding: 1.5625rem;
  }

  @media (max-width: 26.5625rem) {
    padding: 0.75rem;
  }
`;
