import React, { Component } from 'react';
import './styles.scss';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../Redux/Store';
import AppRouter from '../Routes';
import { MuiThemeProvider } from '@material-ui/core';
import { COLOR_THEME } from '../Config';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={COLOR_THEME}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
