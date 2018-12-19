import React, { Component } from 'react';
import ServiceCategories from '../components/ServiceCategories';
import Header from '../components/Header';

import { loadCategories } from '../utilities/api';

export default class Index extends Component {
  state = {
    filters: []
  };

  componentDidMount = () => {
    this.doLoadFilters();
  };

  doLoadFilters = () => {
    loadCategories().then(filters => {
      this.setState({ filters });
    });
  };

  render() {
    const { filters } = this.state;

    return (
      <section>
        <Header />
        <main role="main">
          <ServiceCategories filters={filters} />
        </main>
      </section>
    );
  }
}
