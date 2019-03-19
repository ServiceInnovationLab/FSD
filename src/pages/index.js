import React, { Component } from 'react';
import queryString from 'query-string';

import Page from '../containers/page';
import SearchContainer from '../containers/search-container';
import ServiceCategories from '../components/service-categories';
import ListOfServiceProviders from '../containers/list-of-service-providers';
import MapContainer from '../containers/map-container';
import { loadResults } from '../utilities/api';
import Sharebar from '../components/social-sharebar';
import SearchForm from '../components/search-form';
import SearchCriteria from '../components/search-criteria';

const DEFAULT_SEARCH_RADIUS = '25';

export default class Index extends Component {
  state = {
    serviceProviders: [],
    showMap: false,
    address: '',
    region: '',
  };

  componentDidMount() {
    const { search } = this.props.location;
    this.doLoadResults(search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const { search } = this.props.location;
      this.doLoadResults(search);
    }
  }

  doSetCategory = categoryName => {
    const {
      categoryContext: { selectedCategory, setCategory },
    } = this.props;
    if (selectedCategory === categoryName) {
      setCategory();
      this.updateSearchParams({ category: '' });
    } else this.updateSearchParams({ category: categoryName });
  };

  doResetSearch = form => {
    const {
      history: { push, location },
    } = this.props;
    const {
      categoryContext: { setCategory },
    } = this.props;

    form.reset();
    push(location.pathname);
    setCategory();
    this.setState({
      showMap: false,
      serviceProviders: [],
      autoSuggestValue: '',
    });
  };

  /* Accepts a new query parameter and combines it with existing parameters from the URL query string */
  updateSearchParams(newQuery) {
    const {
      history: { push, location },
    } = this.props;

    const searchVars = queryString.parse(location.search);
    const newSearchVars = Object.assign({}, searchVars, newQuery);

    // Remove query parameters where no value is set (like `keyword=`)
    for (var property in newSearchVars) {
      if (newSearchVars[property] === '') {
        delete newSearchVars[property];
      }
    }

    const newSearchQuery = queryString.stringify(newSearchVars);

    push(`${location.pathname}?${newSearchQuery}`);
  }
  doLoadResults(locationQuery) {
    const {
      categoryContext: { setCategory },
    } = this.props;
    const searchVars = queryString.parse(locationQuery);
    const {
      category = '',
      region = '',
      address = '',
      keyword = '',
      radius = DEFAULT_SEARCH_RADIUS,
      latitude: userLatitude,
      longitude: userLongitude,
    } = searchVars;

    if (category) setCategory(category);
    this.setState({ region, address, keyword, radius });

    loadResults(searchVars).then(res => {
      this.setState({ serviceProviders: res, userLatitude, userLongitude });
    });
  }
  showToggleMapButton(showExtraButtons) {
    const { showMap } = this.state;

    return showExtraButtons ? (
      <button className="btn__search" onClick={() => this.toggleShowMap()}>
        {' '}
        {showListOrMapText(showMap)}
      </button>
    ) : null;
  }
  toggleShowMap = () => this.setState({ showMap: !this.state.showMap });
  autoSuggestOnChange(newValue) {
    this.setState({
      region: newValue,
    });
  }

  render() {
    const {
      serviceProviders,
      showMap,
      address,
      region,
      keyword,
      radius,
    } = this.state;
    const {
      history,
      location,
      categoryContext: { selectedCategory },
    } = this.props;

    const searchVars = queryString.parse(location.search);
    const showExtraButtons = Boolean(
      (serviceProviders && serviceProviders[0]) || Object.keys(searchVars)[0],
    );

    return (
      <Page>
        <SearchContainer>
          <ServiceCategories doSetCategory={this.doSetCategory} />
          <SearchForm
            updateSearchParams={this.updateSearchParams.bind(this)}
            doResetSearch={this.doResetSearch}
            autoSuggestOnChange={this.autoSuggestOnChange.bind(this)}
            address={address}
            region={region}
            showExtraButtons={showExtraButtons}
            initialValues={{ keyword, radius }}
          />
        </SearchContainer>
        <SearchCriteria
          keyword={searchVars.keyword}
          address={address}
          category={selectedCategory}
        />
        {this.showToggleMapButton(showExtraButtons)}
        {showMap ? (
          <MapContainer serviceProviders={serviceProviders} />
        ) : (
          <ListOfServiceProviders
            serviceProviders={serviceProviders}
            history={history}
            userLatitude={this.state.userLatitude}
            userLongitude={this.state.userLongitude}
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
