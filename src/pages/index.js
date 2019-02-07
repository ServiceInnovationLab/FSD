import React, { Component } from 'react';
import queryString from 'query-string';

import Page from '../containers/page';
import SearchContainer from '../containers/search-container';
import ServiceCategories from '../components/service-categories';
import ListOfServiceProviders from '../containers/list-of-service-providers';
import MapContainer from '../containers/map-container';
import { loadResults } from '../utilities/api';
import Sharebar from '../components/social-sharebar';
import SearchForm from '../components/search-form'

export default class Index extends Component {
  state = {
    serviceProviders: [],
    showMap: false,
    showExtraButtons: false,
    autoSuggestValue: ''
  };
  componentDidMount () {
    const { search } = this.props.location
    this.doLoadResults(search)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const { search } = this.props.location
      this.doLoadResults(search)
    }
  }
  setAutoSuggestInitialValue = (region) => {
    this.setState({autoSuggestValue: region})
  }

  doSetCategory = categoryName => {
    const { categoryContext: { selectedCategory, setCategory } } = this.props;
    if (selectedCategory === categoryName) {
      setCategory()
      this.updateSearchParams({category: ''})
    }
    else this.updateSearchParams({category: categoryName})
  };

  doResetSearch = (form) => {
    const { history: { push, location } } = this.props;
    const { categoryContext: { setCategory } } = this.props;

    form.reset()
    push(location.pathname);
    setCategory()
    this.setState({showMap: false, serviceProviders: [], autoSuggestValue: ''})
  }

  /* Accepts a new query parameter and combines it with existing parameters from the URL query string */
  updateSearchParams (newQuery) {
    const { history: { push, location }} = this.props;

    const searchVars = queryString.parse(location.search);
    const newSearchVars = Object.assign({}, searchVars, newQuery);

    // Remove query parameters where no value is set (like `keyword=`)
    for(var property in newSearchVars) {
      if(newSearchVars[property] === '') {
        delete newSearchVars[property]
      }
    }

    const newSearchQuery = queryString.stringify(newSearchVars);

    push(`${location.pathname}?${newSearchQuery}`);
  }
  doLoadResults(locationQuery) {
    const { categoryContext: { setCategory } } = this.props;
    const searchVars = queryString.parse(locationQuery);
    const { category, region } = searchVars

    if(category) setCategory(category)
    if(region) this.setAutoSuggestInitialValue(region)

    loadResults(searchVars).then(res => {
      this.setState({ serviceProviders: res })
      }
    );
  }
  showToggleMapButton(showExtraButtons) {
    const { showMap } = this.state;

    return showExtraButtons ? (
        <button onClick={() => this.toggleShowMap()}>
          {' '}
          {showListOrMapText(showMap)}
        </button>
    ) : null;
  }
  toggleShowMap = () => this.setState({ showMap: !this.state.showMap });
  autoSuggestOnChange (newValue) {
    this.setState({
      autoSuggestValue: newValue
    });
  };

  render() {
    const { serviceProviders, showMap, autoSuggestValue } = this.state;
    const { history, location } = this.props;

    const searchVars = queryString.parse(location.search);
    const showExtraButtons = Boolean(
      (serviceProviders && serviceProviders[0])
      || Object.keys(searchVars)[0])

    return (
      <Page>
        <SearchContainer>
          <ServiceCategories doSetCategory={this.doSetCategory} />
          <SearchForm
            updateSearchParams={this.updateSearchParams.bind(this)}
            doResetSearch={this.doResetSearch}
            autoSuggestOnChange={this.autoSuggestOnChange.bind(this)}
            autoSuggestValue={autoSuggestValue}
            showExtraButtons={showExtraButtons}
            initialValues={{keyword: searchVars.keyword}}
          />
          {this.showToggleMapButton(showExtraButtons)}
        </SearchContainer>
        {showMap ? (
          <MapContainer serviceProviders={serviceProviders} />
        ) : (
          <ListOfServiceProviders
            serviceProviders={serviceProviders}
            history={history}
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