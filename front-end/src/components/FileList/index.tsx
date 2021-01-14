import * as React from 'react';

import ArrowUp from '../../assets/ArrowUp.svg';
import { CardContainer, Card, Container } from './styles';

const FileList: React.FC = () => (
  <Container>
    <CardContainer>
      <Card>
        <header>
          <p>Entradas</p>
          <img src={ArrowUp} alt="Income" />
        </header>
        <h1 data-testid="balance-income">R$ 5.000,00</h1>
      </Card>
      <Card>
        <header>
          <p>Entradas</p>
          <img src={ArrowUp} alt="Income" />
        </header>
        <h1 data-testid="balance-income">R$ 5.000,00</h1>
      </Card>
      <Card>
        <header>
          <p>Entradas</p>
          <img src={ArrowUp} alt="Income" />
        </header>
        <h1 data-testid="balance-income">R$ 5.000,00</h1>
      </Card>
    </CardContainer>
  </Container>
);

export default FileList;
