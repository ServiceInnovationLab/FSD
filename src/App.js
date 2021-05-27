// Modules
import React, {Component, Fragment} from 'react';
// Github Pages requires HashRouter to properly route subpages
import {HashRouter as Router, Route} from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

// Styles
import './assets/scss/style.scss';
// Contexts
import {CategoryContext, CategoryProvider} from './contexts/category-context';
// Utilities
import {GH_PAGES_SUFFIX} from './utilities/url';
// Pages
import Index from './pages';
import Service from './pages/service';
const history = createBrowserHistory();
const trackingId = process.env.TRACKING_ID;
ReactGA.initialize(trackingId);

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

class App extends Component {
  render() {
    return (
      <CategoryProvider>
        <CategoryContext.Consumer>
          {categoryContext => (
            <Router basename={GH_PAGES_SUFFIX} hashType="slash" history={history}>
              <Fragment>
                <Route exact path="/" render={props => <Index categoryContext={categoryContext} {...props} />}/>
                <Route path="/service/:id" render={props => <Service categoryContext={categoryContext} {...props} />}/>
              </Fragment>
            </Router>
          )}
        </CategoryContext.Consumer>
      </CategoryProvider>
    );
  }
}

export default App;
