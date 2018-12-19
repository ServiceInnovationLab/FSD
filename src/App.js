// Modules
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Styles
import './assets/scss/style.scss';

// Contexts
import { CategoryContext, CategoryProvider } from './contexts/category-context';

// Pages
import Index from './pages/index';

class App extends Component {
  render() {
    return (
      <Router>
        <CategoryProvider>
          <CategoryContext.Consumer>
            {categoryContext => (
              <div className="app__root">
                <Route
                  path="/"
                  render={props => (
                    <Index categoryContext={categoryContext} {...props} />
                  )}
                />
              </div>
            )}
          </CategoryContext.Consumer>
        </CategoryProvider>
      </Router>
    );
  }
}

export default App;
