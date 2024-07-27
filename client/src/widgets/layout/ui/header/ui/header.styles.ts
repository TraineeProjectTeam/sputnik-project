import { Layout } from 'antd';
import styled from 'styled-components';

export const StyledHeader = styled(Layout.Header)`
  height: var(--header-height);
  background-color: var(--main-background-color);
  display: flex;
  column-gap: 0.75rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: var(--header-z-index);
  align-items: center;
  justify-content: space-between;
`;

export const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
`;
