import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { CategoryContext, CategoryProvider } from './contexts/category-context';
import Index from './pages/index';

import './assets/scss/style.scss';

class App extends Component {
  render() {
    return (
      <CategoryProvider>
        <CategoryContext.Consumer>
          {categoryContext => (
            <Router>
              <Route
                path="/"
                render={props => (
                  <Index categoryContext={categoryContext} {...props} />
                )}
              />
            </Router>
          )}
        </CategoryContext.Consumer>
      </CategoryProvider>
    );
  }
}

export default App;
