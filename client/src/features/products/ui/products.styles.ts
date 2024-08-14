import styled from 'styled-components';

export const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

export const ListStyled = styled.ul`
  display: flex;
  max-width: 78rem;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;

  @media (max-width: 1300px) {
    justify-content: center;
  }
`;
