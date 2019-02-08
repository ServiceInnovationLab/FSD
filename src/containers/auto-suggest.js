import Autosuggest from 'react-autosuggest';
import React from 'react';
import { getSuggestions, getAddressMetadata, getLocationMetadata } from '../utilities/addressfinder';

const getSuggestionValue = suggestion => suggestion.a;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.a}
  </div>
);

// Represents the parts of a location (or address) we are interested in for this
// app. 
//
// The default empty string properties ensure that when the object is used to
// update the search params in the URL any existing values are removed.
export class SearchLocation {
  latitude = '';
  longitude = ''; 
  region = '';
  address = '';

  constructor(properties = {}) {
    Object.assign(this, properties);
  }
}

const noLocation = new SearchLocation();

export default class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: []
    };
  }

  onChange (event, { newValue }) {
    if(newValue === '') {
      const {updateSearchParams} = this.props;
      updateSearchParams(noLocation);
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
      suggestions: []
    });
  };

  render() {
    const { suggestions } = this.state;
    const {address} = this.props
    const inputProps = {
      placeholder: 'Start typing an address',
      value: address,
      onChange: this.onChange.bind(this)
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