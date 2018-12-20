import React, { Component } from 'react';

import SearchContainer from '../containers/search-container';
import ServiceCategories from '../components/service-categories';
import ListOfServiceProviders from '../containers/list-of-service-providers';
import Header from '../components/header';

import { loadResults } from '../utilities/api';

export default class Index extends Component {
  state = {
    serviceProviders: []
  };

  doSetCategory = categoryName => {
    const {
      history: { push, location },
      categoryContext: { setCategory }
    } = this.props;
    setCategory(categoryName);
    push(`${location.pathname}?category=${categoryName}`);
    loadResults(location.search).then(res =>
      this.setState({ serviceProviders: res })
    );
  };

  render() {
    const { serviceProviders } = this.state;
    const { history } = this.props;

    return (
      <section>
        <Header />
        <main role="main">
          <SearchContainer>
            <ServiceCategories doSetCategory={this.doSetCategory} />
          </SearchContainer>
          <ListOfServiceProviders
            serviceProviders={serviceProviders}
            history={history}
          />
        </main>
      </section>
    );
  }
}
