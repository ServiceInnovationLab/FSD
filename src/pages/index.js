import React, { Component } from 'react';

import Page from '../containers/page';
import SearchContainer from '../containers/search-container';
import ServiceCategories from '../components/service-categories';
import ListOfServiceProviders from '../containers/list-of-service-providers';

import { loadResults } from '../utilities/api';
import queryString from '../utilities/query-string';

export default class Index extends Component {
  state = {
    serviceProviders: []
  };

  doSetCategory = categoryName => {
    const { categoryContext: { setCategory } } = this.props;
    setCategory(categoryName);
    this.doLoadResults(categoryName);
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

  render() {
    const { serviceProviders } = this.state;
    const { history } = this.props;

    return (
      <Page>
        <SearchContainer>
          <ServiceCategories doSetCategory={this.doSetCategory} />
        </SearchContainer>
        <ListOfServiceProviders
          serviceProviders={serviceProviders}
          history={history}
        />
      </Page>
    );
  }
}
