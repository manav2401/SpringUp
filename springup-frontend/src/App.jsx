import React from 'react';
import './App.css';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/landing';
import Creator from './components/creator';
import Header from './components/header';
import Supporter from './components/supporter';

const breakpoints = ['360px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints,
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={newTheme}>
        <CSSReset />
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/creator/:address?" component={Creator} />
          <Route path="/supporter/:creatorAddress?" component={Supporter} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
