import { Button, Card } from 'antd';
import styled from 'styled-components';

export const StyledOrderInfo = styled(Card)`
  box-shadow: var(--shadow);

  @media (max-width: 26.5625rem) {
    .ant-card-body {
      padding: 0.625rem;
    }
  }
`;

export const StyledStatus = styled.p`
  display: flex;
  column-gap: 0.625rem;
`;

export const StyledPaidSpan = styled.span`
  text-transform: lowercase;
  font-size: 0.875rem;
  font-weight: 400;
  & > button {
    cursor: default;
  }
`;

export const StyledPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;

  @media (max-width: 26.5625rem) {
    font-size: 1rem;
  }
`;

export const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 700;
  flex-wrap: wrap;

  @media (max-width: 26.5625rem) {
    font-size: 1rem;
  }
`;

export const StyledLink = styled(Button)`
  font-size: 0.875rem;
  padding: 0;
`;

export const StyledContent = styled.div`
  padding-top: 1.25rem;

  @media (max-width: 26.5625rem) {
    padding-top: 1rem;
  }
`;
