import { Spin } from "antd";
import { IGlobalSpinProps } from "../model/global-spin.types"
import styled from "styled-components";

export const GlobalSpin = (props: IGlobalSpinProps) => {
  const { size } = props;

  return <StyledSpin size={size} />
}

const StyledSpin = styled(Spin)`
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
`