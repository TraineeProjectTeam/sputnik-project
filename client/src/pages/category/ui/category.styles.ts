import { Button, Typography } from 'antd';
import styled from 'styled-components';

export const TitleStyled = styled(Typography.Title)`
  font-size: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
export const LinkStyled = styled(Button)`
  padding: 0;
  span {
    font-size: 1.7rem;
  }
`
