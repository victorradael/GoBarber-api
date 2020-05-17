import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

import AppProviders from './hooks/index';

const App: React.FC = () => (
  <Router>
    <AppProviders>
      <Routes />
    </AppProviders>

    <GlobalStyle />
  </Router>
);

export default App;
