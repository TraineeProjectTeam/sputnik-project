import { Layout } from 'antd';
import styled from 'styled-components';
import { ILayoutProps } from '../model/layout.types';
import { Header } from './header';
import { Footer } from './footer';

export const LayoutComponent = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <StyledLayoutConainer>
      <StyledLayout>
        <Header />
        <StyledContainer>
          <StyledContent>{children}</StyledContent>
          <Footer />
        </StyledContainer>
      </StyledLayout>
    </StyledLayoutConainer>
  );
};

const StyledLayoutConainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StyledLayout = styled(Layout)`
  max-width: 75rem;
  position: relative;
  height: 100%;
`;

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledContent = styled(Layout.Content)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
