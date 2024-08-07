import { CopyOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0 !important;
  }
  .ant-card-meta {
    padding: 1.25rem 0rem 0rem;
    &-title {
      overflow: initial;
      white-space: initial;
      text-overflow: initial;

      & > h2 {
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 0.025rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.3125rem 0.625rem;

        @media (max-width: 768px) {
          font-size: 1.5625rem;
        }

        @media (max-width: 600px) {
          font-size: 1.25rem;
        }
      }

      & > p {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }

    @media (max-width: 425px) {
      padding: 0.625rem 0rem 0rem;
    }
  }
`;

export const StyledContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(33.3%, 1fr));

  @media (max-width: 600px) {
    display: block;
    grid-template-columns: auto;
  }
`;

export const StyledColumn = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }

  @media (max-width: 640px) {
    padding: 0.625rem;
  }

  @media (max-width: 480px) {
    padding: 0.3125rem;
  }

  @media (max-width: 425px) {
    padding: 0.3125rem;
  }
`;

export const StyledColumnContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;

  span {
    svg {
      font-size: 1.5rem;
    }
  }
`;

export const StyledFullWidth = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledPrice = styled.p`
  font-weight: 500;
  font-size: 1rem;
`;

export const StyledColumnTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.0125rem;
`;

export const StyledOrderBlock = styled.div`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const StyledCardsOrder = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: var(--shadow);
  border-radius: 0.75rem;
  row-gap: 1.25rem;
  padding: 1.5rem;
`;

export const StyledCardOrder = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  column-gap: 0.875rem;

  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }

  & > p {
    padding-right: 1rem;
  }
`;

export const StyledProductName = styled.div`
  display: flex;
  column-gap: 0.625rem;
  width: 35%;
  & > p {
    margin-bottom: 0;
  }
`;

export const StyledCardsOrderNums = styled.p`
  font-weight: 500;
  letter-spacing: 0.0125rem;
  line-height: 1.5rem;
`;

export const StyledPickupPointBlock = styled.div`
  padding-top: 1.5rem;
`;

export const StyledImg = styled.img`
  height: 4.5rem;
  width: 4.5rem;
  object-fit: contain;
`;

export const StyledCopyOutlined = styled(CopyOutlined)`
  font-size: 1.25rem;
`;
