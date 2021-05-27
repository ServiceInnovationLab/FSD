import Autosuggest from 'react-autosuggest';
import React from 'react';
import {getSuggestions, getAddressMetadata, getLocationMetadata} from '../utilities/addressfinder';

const getSuggestionValue = suggestion => suggestion.a;

const renderSuggestion = suggestion => <div>{suggestion.a}</div>;

// Once an address suggestion has been selected, pressing any of these keys will
// clear the address value.
//
// These key definitions are available at
// https://www.w3.org/TR/uievents-key/#named-key-attribute-value
const CLEAR_ADDRESS_KEYS = [
  'Backspace',
  'Clear',
  'Delete',
];

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
  static get None() {
    return SearchLocation.nullLocation;
  }
}

export default class AutoSuggest extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
    };
  };

  clearAddress() {
    this.props.updateSearchParams(SearchLocation.None);
  };

  onChange(event, {newValue}) {
    if (newValue === '') {
      this.clearAddress();
    }

    this.props.autoSuggestOnChange(newValue);
  };

  onKeyDown(event) {
    if (CLEAR_ADDRESS_KEYS.includes(event.key)) {
      this.clearAddress();
    }
  };

  onSuggestionSelected = async (event, {suggestion}) => {
    const {updateSearchParams} = this.props;
    if (suggestion.type === 'location') {
      const result = await getLocationMetadata(suggestion.pxid);
      updateSearchParams(new SearchLocation({latitude: result.y, longitude: result.x, region: result.a}));
    } else {
      const result = await getAddressMetadata(suggestion.pxid);
      updateSearchParams(new SearchLocation({latitude: result.y, longitude: result.x, address: result.a}));
    }
  };

  onSuggestionsFetchRequested = ({value}) => {
    getSuggestions(value).then(suggestions => this.setState({suggestions}));
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const {suggestions} = this.state;
    const {address} = this.props;
    const inputProps = {
      placeholder: 'Start typing an address',
      value: address,
      onChange: this.onChange.bind(this),
      onKeyDown: this.onKeyDown.bind(this),
      name: 'address-autosuggest',
      id: 'searchBox',
      className: "MuiInputBase-input"
    };
    return (
      <div className="form-section">
        <div><label htmlFor='#searchBox' className='react-autosuggest__label'>Near</label></div>
        <div
          className="react-autosuggest__parent MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
      </div>
    );
  }
}
