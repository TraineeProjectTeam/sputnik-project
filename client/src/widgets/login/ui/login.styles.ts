import styled from 'styled-components';

export const LoginStyled = styled.article`
  padding: 50px 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  h1 {
    width: 100%;
    text-align: center;
  }
  .ant-tabs {
    width: 100%;
    max-width: 400px;
    .ant-tabs-nav {
      margin-bottom: 0;
    }
    .ant-tabs-content-holder {
      padding: 15px 15px 0;
      border-top: none;
      border-radius: 0 0 8px 8px;
      background: #ffffff;
      border: 1px solid #f0f0f0;
      border-top-color: transparent;
    }
    .ant-tabs-tab {
      background: none;
      &.ant-tabs-tab-active {
        background: #ffffff;
      }
    }
  }
`;
