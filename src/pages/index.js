import React, { Component, Fragment } from 'react';

import Page from '../containers/page';
import SearchContainer from '../containers/search-container';
import ServiceCategories from '../components/service-categories';
import ListOfServiceProviders from '../containers/list-of-service-providers';
import MapContainer from '../containers/map-container';
import { loadResults } from '../utilities/api';
import queryString from '../utilities/query-string';
import Sharebar from '../components/social-sharebar';

export default class Index extends Component {
  state = {
    serviceProviders: [],
    showMap: false
  };

  toggleShowMap = () => this.setState({ showMap: !this.state.showMap });

  doSetCategory = categoryName => {
    const { categoryContext: { setCategory } } = this.props;
    setCategory(categoryName);
    this.doLoadResults(categoryName);
  };
  doResetSearch = () => {
    const { history: { push, location } } = this.props;
    const { categoryContext: { setCategory } } = this.props;
    push(`${location.pathname}`);
    setCategory();
    this.setState({ serviceProviders: [] });
  };
  doLoadResults(categoryName) {
    const { history: { push, location } } = this.props;

    const searchVars = queryString.parse(location.search);
    const newSearchVars = Object.assign(searchVars, { category: categoryName });

    loadResults(newSearchVars).then(res =>
      this.setState({ serviceProviders: res })
    );
    push(`${location.pathname}?category=${categoryName}`);
  }

  showExtraFormButtons() {
    const { serviceProviders, showMap } = this.state;

    return serviceProviders && serviceProviders[0] ? (
      <Fragment>
        <button onClick={() => this.toggleShowMap()}>
          {' '}
          {showListOrMapText(showMap)}
        </button>
        <button onClick={() => this.doResetSearch()}> Reset Form</button>
      </Fragment>
    ) : null;
  }

  render() {
    const { serviceProviders, showMap } = this.state;
    const { history } = this.props;

    return (
      <Page>
        <SearchContainer>
          <ServiceCategories doSetCategory={this.doSetCategory} />
          {this.showExtraFormButtons()}
        </SearchContainer>
        {showMap ? (
          <MapContainer serviceProviders={serviceProviders} />
        ) : (
          <ListOfServiceProviders
            serviceProviders={serviceProviders}
            history={history}
          />
        )}
        <Sharebar />
      </Page>
    );
  }
}

function showListOrMapText(showMap) {
  return showMap ? 'Show List' : 'Show Map';
}
