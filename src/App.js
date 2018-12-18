import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from './pages/index';

import './assets/scss/style.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" component={Index} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
