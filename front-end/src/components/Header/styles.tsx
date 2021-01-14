import styled from 'styled-components';

export const Container = styled.header`
  background: #5636d3;
  padding: 30px 0;
  header {
    display: flex;
    justify-content: space-between;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 20px 150px;
    align-items: center;

    nav {
      a {
        text-decoration: none;
        color: #fff;
        font: 16px Poppins, sans-serif;
        font-weight: 500;

        & + a {
          margin-left: 32px;
        }

        &[data-inPage] {
          font-weight: 600;
        }
      }
    }
  }
`;
