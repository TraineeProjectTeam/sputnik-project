import { Layout } from 'antd';
import styled from 'styled-components';
import { ILayoutProps } from '../model/layout.types';
import { Header } from './header';
import { Footer } from './footer';

const { Content } = Layout;

export const LayoutComponent = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <StyledLayoutConainer>
      <StyledLayout>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </StyledLayout>
    </StyledLayoutConainer>
  )
}

const StyledLayoutConainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  height: 100vh;
`

const StyledLayout = styled(Layout)`
  max-width: 75rem;
`;

