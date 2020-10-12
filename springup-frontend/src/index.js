import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { theme, ThemeProvider } from '@chakra-ui/core';
import App from './App';
import * as serviceWorker from './serviceWorker';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: '#8491A3',
      800: '#93B48B',
      700: '#87D68D',
      600: '#BCEBCB',
      500: 'F7FFF6',
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
