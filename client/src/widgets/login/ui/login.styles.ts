import styled from 'styled-components';

export const LoginStyled = styled.article`
  padding: 3.125rem 1.25rem;
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
    max-width: 25rem;
    .ant-tabs-nav {
      margin-bottom: 0;
    }
    .ant-tabs-content-holder {
      padding: 0.9375rem 0.9375rem 0;
      border-top: none;
      border-radius: 0 0 0.5rem 0.5rem;
      background: #ffffff;
      border: 0.0625rem solid #f0f0f0;
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
