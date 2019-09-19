import React, { Component } from 'react';
import queryString from 'query-string';

import Page from '../containers/page';
import SearchContainer from '../containers/search-container';
import ListOfServiceProviders from '../containers/list-of-service-providers';
import MapContainer from '../containers/map-container';
import { loadResults } from '../utilities/api';
import Sharebar from '../components/social-sharebar';
import SearchForm from '../components/search-form';
import DistanceSelector from '../components/distance-selector';
import MapListToggle from '../components/map-list-toggle';
import SearchCriteria from '../components/search-criteria';
import uniqueServices from '../utilities/uniqueServices';
import UserLocation from '../utilities/userLocation';

const DEFAULT_SEARCH_RADIUS = '25';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.toggleShowMap = this.toggleShowMap.bind(this);
    this.autoSuggestOnChange = this.autoSuggestOnChange.bind(this);
    this.updateSearchParams = this.updateSearchParams.bind(this);
  }

  state = {
    serviceProviders: [],
    showMap: false,
    address: '',
    region: '',
    keyword: '',
    radius: DEFAULT_SEARCH_RADIUS
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

  doLoadResults(locationQuery, serviceProvidersPerPage = 50) {
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
      longitude: userLongitude
    } = searchVars;

    setCategory(category);
    this.setState({ region, address, keyword, radius });

    loadResults(searchVars).then(res => {
      const unique_Results = uniqueServices(res, 'PUBLISHED_PHONE_1')
      const paged_results = unique_Results.slice(0, serviceProvidersPerPage)
      this.setState({
        serviceProviders: paged_results,
        userLatitude,
        userLongitude,
        numOfResults: unique_Results.length,
        numOfResultsDisplayed: paged_results.length
      });
    });
  }

  toggleShowMap() {
    this.setState({
      showMap: !this.state.showMap
    });
  }

  autoSuggestOnChange(newValue) {
    this.setState({
      region: newValue,
    });
  }

  handleRadiusChange(radius) {
    this.setState({
      radius: radius
    });
    this.updateSearchParams({radius: radius});
  }

  render() {
    const {
      serviceProviders,
      showMap,
      address,
      region,
      keyword,
      radius,
      numOfResults,
      numOfResultsDisplayed,
      userLatitude,
      userLongitude
    } = this.state;

    const { history, location, categoryContext: {selectedCategory} } = this.props;

    const searchVars = queryString.parse(location.search);
    const showExtraButtons = Boolean((serviceProviders && serviceProviders[0]) || Object.keys(searchVars)[0]);

    const userLocation = UserLocation(
        address || region,
        userLatitude,
        userLongitude);

    return (
      <Page>
        <section className="white-bg-section" id="search">
          <SearchContainer>
            <SearchForm
              updateSearchParams={this.updateSearchParams}
              doResetSearch={this.doResetSearch}
              autoSuggestOnChange={this.autoSuggestOnChange}
              doSetCategory={this.doSetCategory}
              address={address}
              region={region}
              showExtraButtons={showExtraButtons}
              initialValues={{ keyword }}
            />
          </SearchContainer>
        </section>
        <section id="results" className="white-bg-section">
          <SearchCriteria
            keyword={searchVars.keyword}
            address={address}
            region={region}
            category={selectedCategory}
            numOfResults={numOfResults}
            numOfResultsDisplayed={numOfResultsDisplayed}
          />
          <div className="d-flex justify-content-between align-end">
            {
              address ? (
                <DistanceSelector
                handleRadiusChange={this.handleRadiusChange}
                currentRadius={ radius }
                />
              ) : null
            }
            {
              showExtraButtons ? (
                <MapListToggle showMap={showMap} toggleShowMap={this.toggleShowMap} />
              ) : null
            }
          </div>
        </section>
        <section>
          {showMap ? (
            <MapContainer
              serviceProviders={serviceProviders}
              userLocation={userLocation}
            />
          ) : (
            <ListOfServiceProviders
              serviceProviders={serviceProviders}
              history={history}
              userLocation={userLocation}
            />
          )}
        </section>
        <section className="white-bg-section" id="share">
          <Sharebar />
        </section>
      </Page>
    );
  }
}
