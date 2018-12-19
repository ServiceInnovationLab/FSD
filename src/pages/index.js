import React, { Component } from 'react';

import ServiceCategories from '../components/Service-Categories';
import ListOfServiceProviders from '../components/List-Of-Service-Providers';
import Header from '../components/Header';

import { loadResults } from '../utilities/api';

export default class Index extends Component {
  state = {
    serviceProviders: []
  }

  doSetCategory = categoryName => {
    const {
      history: { push, location },
      categoryContext: { setCategory }
    } = this.props;
    setCategory(categoryName);
    push(`${location.pathname}?category=${categoryName}`);
    loadResults(location.search).then(res => this.setState({serviceProviders: res}))
  };

  render() {
    const { serviceProviders } = this.state;
    const { history } = this.props;

    return (
      <section>
        <Header />
        <main role="main">
          <ServiceCategories doSetCategory={this.doSetCategory} />
          <ListOfServiceProviders serviceProviders={serviceProviders} history={history}/>
        </main>
      </section>
    );
  }
}
