import React, { Component, Fragment } from 'react';
import queryString from 'query-string';

import SearchContainer from '../containers/search-container';
import ServiceCategories from '../components/service-categories';
import ListOfServiceProviders from '../containers/list-of-service-providers';
import Header from '../components/header';
import MapContainer from '../containers/map-container'
import { loadResults } from '../utilities/api';

export default class Index extends Component {
  state = {
    serviceProviders: [],
    showMap: false
  };

  toggleShowMap = () => this.setState({showMap: !this.state.showMap})

  doSetCategory = categoryName => {
    const { categoryContext: { setCategory } } = this.props;
    setCategory(categoryName);
    this.doLoadResults({category: categoryName});
  };
  doResetSearch = () => {
    const { history: { push, location } } = this.props;
    const { categoryContext: { setCategory } } = this.props;
    push(`${location.pathname}`);
    setCategory()
    this.setState({serviceProviders: []})
  }

  doLoadResults(newQuery) {
    const { history: { push, location } } = this.props;

    const searchVars = queryString.parse(location.search);
    const newSearchVars = Object.assign({}, searchVars, newQuery);
    const newSearchQuery = queryString.stringify(newSearchVars);

    loadResults(newSearchVars).then(res =>
      this.setState({ serviceProviders: res })
    );

    push(`${location.pathname}?${newSearchQuery}`);
  }

  showExtraFormButtons () {
    const { serviceProviders, showMap } = this.state;

    return serviceProviders && serviceProviders[0]
    ? <Fragment>
      <button onClick={() => this.toggleShowMap() }> {showListOrMapText(showMap)}</button>
      <button onClick={() => this.doResetSearch()}> Reset Form</button>
    </Fragment>
    : null
  }

  render() {
    const { serviceProviders, showMap } = this.state;
    const { history } = this.props;

    return (
      <section>
        <Header />
        <main role="main">
          <SearchContainer>
            <ServiceCategories doSetCategory={this.doSetCategory} />
            {this.showExtraFormButtons()}
          </SearchContainer>
          { showMap
            ? <MapContainer
              serviceProviders={serviceProviders}
            />
            : <ListOfServiceProviders
              serviceProviders={serviceProviders}
              history={history}
            />
          }
        </main>
      </section>
    );
  }
}

function showListOrMapText (showMap) {
  return showMap
  ? 'Show List'
  : 'Show Map'
}
