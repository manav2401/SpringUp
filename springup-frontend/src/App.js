import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import Landing from './components/landing';
import Creator from './components/creator';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints
};

function App() {
  return (
    <Router> 
    <ThemeProvider theme={newTheme}>
      <CSSReset />
      <Header />
      <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/creator" component={Creator} />
            {/* <Creator /> */}
          {/* <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute> */}
        </Switch>
      {/* <Landing></Landing> */}
    </ThemeProvider>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
