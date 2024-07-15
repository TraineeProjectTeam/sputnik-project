import { Layout } from 'antd';
import styled from 'styled-components';
import { ILayoutProps } from '../model/layout.types';
import { Header } from './header';
import { Footer } from './footer';

export const LayoutComponent = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <Layout>
      <Header />
      <StyledContainer>
        <StyledContent>{children}</StyledContent>
      </StyledContainer>
      <Footer />
    </Layout>
  );
};

const StyledContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 7.8125rem);
  @-moz-document url-prefix() {
    scrollbar-color: var(--main-background-color) var(--main-scrollbar-background-color);
    scrollbar-width: thin;
  }
`;

const StyledContent = styled(Layout.Content)`
  padding: 0.5rem;
  max-width: 62.5rem;
  margin: 0 auto;
`;
