import * as React from 'react';
import logoGofinances from '../../assets/FinanceLogo.svg';
import { Container } from './styles';

const Header: React.FC = () => (
  <Container>
    <header>
      <img src={logoGofinances} alt="logoGofinances" />
      <nav>
        <a data-inPage href="/">
          Listagem
        </a>
        <a href="/importar">Importar</a>
      </nav>
    </header>
  </Container>
);

export default Header;
