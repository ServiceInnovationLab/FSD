import React, { Component } from 'react';

import SearchContainer from '../containers/search-container';
import ServiceCategories from '../components/service-categories';
import ListOfServiceProviders from '../containers/list-of-service-providers';
import Header from '../components/header';
import MapContainer from '../containers/map-container'
import { loadResults } from '../utilities/api';
import queryString from '../utilities/query-string';

export default class Index extends Component {
  state = {
    serviceProviders: [],
    showMap: false
  };

  toggleShowMap = () => this.setState({showMap: !this.state.showMap})

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
    const { serviceProviders, showMap } = this.state;
    const { history } = this.props;
    console.log(showMap);
    return (
      <section>
        <Header />
        <main role="main">
          <SearchContainer>
            <ServiceCategories doSetCategory={this.doSetCategory} />
            {showToggleButton(serviceProviders, showMap, this.toggleShowMap)}
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

function showToggleButton (serviceProviders, showMap, toggleShowMap) {
  return serviceProviders && serviceProviders[0]
  ? <button onClick={() => toggleShowMap() }> {showListOrMapText(showMap)}</button>
  : null
}
