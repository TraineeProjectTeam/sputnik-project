import { Layout } from 'antd';
import { ILayoutProps } from '../model/layout.types';
import { Header } from './header';
import { Footer } from './footer';
import { StyledContainer, StyledContent } from './layout.styles';

export const LayoutСomponent = (props: ILayoutProps) => {
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
