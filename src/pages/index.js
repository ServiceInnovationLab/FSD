import React, { Component } from 'react';

import ServiceCategories from '../components/ServiceCategories';
// import ListOfServiceProviders from '../components/ServiceCategories';
import Header from '../components/Header';

import { loadCategories } from '../utilities/api';

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
  };

  render() {
    // const { serviceProviders } = this.state;

    return (
      <section>
        <Header />
        <main role="main">
          <ServiceCategories doSetCategory={this.doSetCategory} />
          {/* <ListOfServiceProviders serviceProviders={serviceProviders} /> */}
        </main>
      </section>
    );
  }
}
