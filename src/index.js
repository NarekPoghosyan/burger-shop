// libraries
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { render } from 'react-dom';
import { Provider } from 'react-redux'

// store
import store from './redux/store'

// components
import App from './App';

// styles
import './index.scss';

render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Provider store={store}>
          <App />
        </Provider>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);