import { Button } from 'antd';
import styled, { css } from 'styled-components';
import { EnumStatus } from '../model/status-button.constants';

export const StyledButtonStatus = styled(Button)<{ status: EnumStatus }>`
  color: white !important;
  font-weight: 700 !important;

  ${(props) => {
    switch (props.status) {
      case EnumStatus.active:
        return css`
          background-color: #f4d23f !important;
        `;
      case EnumStatus.in_way:
        return css`
          background-color: #5fb65f !important;
        `;
      case EnumStatus.delivered:
        return css`
          background-color: rgba(249, 17, 85, 1) !important;
        `;
      case EnumStatus.recieved:
        return css`
          background-color: rgba(0, 26, 52, 0.4) !important;
        `;
      case EnumStatus.cancelled:
        return css`
          background-color: rgba(0, 26, 52, 0.6) !important;
        `;
      default:
        return css`
          background-color: gray;
        `;
    }
  }}
`;
