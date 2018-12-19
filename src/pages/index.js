import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceCategories from '../components/service-categories';
// import ListOfServiceProviders from '../components/list-of-service-providers';
import Header from '../components/header';

export default class Index extends Component {
  state = {
    serviceProviders: []
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    categoryContext: PropTypes.object.isRequired
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
