import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  .ant-card-head {
    padding: 0;
  }

  .ant-card-body {
    padding: 0;

    .ant-avatar {
      margin-bottom: 1rem;
    }

    .ant-descriptions-item-content {
      .ant-form-item {
        margin: 0;
      }
    }

    .ant-descriptions-item {
      padding-right: 0.5rem;
      padding-bottom: 0.5rem;

      &-content {
        display: block;
      }
    }
  }
`;

export const StyledButtons = styled.div`
  display: flex;
  padding-top: 0.9375rem;
  column-gap: 0.5rem;
`;
