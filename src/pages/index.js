import React, { Component } from 'react';
import ServiceCategories from '../components/service-categories';
import Header from '../components/header';
import MapContainer from '../containers/map-container';

import ListOfServiceProviders from '../components/list-of-service-providers';

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
          <MapContainer id='map' style={{height: '50vh'}} />
        </main>
      </section>
    );
  }
}
