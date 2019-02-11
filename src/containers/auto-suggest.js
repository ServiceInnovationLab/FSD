import Autosuggest from 'react-autosuggest';
import React from 'react';
import { getSuggestions, getAddressMetadata, getLocationMetadata } from '../utilities/addressfinder';

const getSuggestionValue = suggestion => suggestion.a;

const renderSuggestion = suggestion => <div>{suggestion.a}</div>;

// Represents the parts of a region or street address we are interested in for
// this app - specifically the properties which get included in the URL query
// string.
//
// The default empty string properties ensure that when an instance is used to
// update the search params in the URL any existing values are removed.
export class SearchLocation {
  static nullLocation = new SearchLocation();

  latitude = '';
  longitude = ''; 
  region = '';
  address = '';

  constructor(properties = {}) {
    Object.assign(this, properties);
  }

  // an empty location instance, suitable for clearing an existing location from
  // the URL
  static get None() { return SearchLocation.nullLocation; }
}

export default class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
    };
  }

  onChange (event, { newValue }) {
    if(newValue === '') {
      const {updateSearchParams} = this.props;
      updateSearchParams(SearchLocation.None);
    }

    this.props.autoSuggestOnChange(newValue)
  };

  onSuggestionSelected = async (event, {suggestion}) => {
    const {updateSearchParams} = this.props

    if (suggestion.type === 'location') {
      const result = await getLocationMetadata(suggestion.pxid);
      updateSearchParams(new SearchLocation({latitude: result.y, longitude: result.x, region: result.a}));
    } else {
      const result = await getAddressMetadata(suggestion.pxid);
      updateSearchParams(new SearchLocation({latitude: result.y, longitude: result.x, address: result.a }));
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value)
      .then(suggestions => this.setState({suggestions}))
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { suggestions } = this.state;
    const {address} = this.props
    const inputProps = {
      placeholder: 'Start typing an address',
      value: address,
      onChange: this.onChange.bind(this),
      name: 'address-autosuggest'
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
