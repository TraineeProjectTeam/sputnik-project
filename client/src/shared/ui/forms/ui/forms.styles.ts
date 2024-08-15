import styled from 'styled-components';
import { Button } from 'antd';

export const ButtonWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 0.625rem;
  align-items: center;
`;

export const ButtonLinkStyled = styled(Button)`
  padding-left: 0;
`;
