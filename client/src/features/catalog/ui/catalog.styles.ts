import { Card, Typography } from 'antd';
import styled from 'styled-components';

export const CardStyled = styled(Card)`
  width: 18.75rem;
`;

export const ListStyled = styled.ul`
  display: flex;
  max-width: 78rem;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  justify-content: center;
`;
export const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

export const NameStyled = styled(Typography.Title)`
  text-align: center;
`;
