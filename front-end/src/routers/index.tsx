import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Listagem from '../pages/Listagem';
import Importar from '../pages/Importar';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Listagem} />
    <Route path="/importar" component={Importar} />
  </Switch>
);

export default Routes;
