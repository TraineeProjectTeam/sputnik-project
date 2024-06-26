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
        <StyledContent>{children}</StyledContent>
        <Footer />
      </StyledLayout>
    </StyledLayoutConainer>
  )
}

const StyledLayoutConainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

const StyledLayout = styled(Layout)`
  max-width: 75rem;
  position: relative;
`

const StyledContent = styled(Layout.Content)`
  flex-grow: 1;
`