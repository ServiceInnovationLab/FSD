import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import React from 'react';
import queryString from 'query-string';

const ADDRESS_FINDER_KEY = process.env.REACT_APP_ADDRESS_FINDER_API_KEY;

const getSuggestions = userInput => {
  const cleansedInput = userInput.trim().toLowerCase();
  const inputLength = cleansedInput.length;

  if (inputLength === 0) return [];

  const query = queryString.stringify({
    key: ADDRESS_FINDER_KEY,
    q: cleansedInput,
    format: 'json',
    strict: 2,
  });

  const url = `https://api.addressfinder.io/api/nz/location?${query}`;

  return axios.get(url).then(response => {
    return response.data.completions;
  });
};

const getSuggestionValue = suggestion => suggestion.a;

const renderSuggestion = suggestion => <div>{suggestion.a}</div>;

export default class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
    };
  }

  onChange(event, { newValue }) {
    this.props.autoSuggestOnChange(newValue);
  }

  onSuggestionSelected = (evt, { suggestion: { pxid, a } }) => {
    const query = queryString.stringify({
      key: ADDRESS_FINDER_KEY,
      format: 'json',
      pxid: pxid,
    });

    const url = `https://api.addressfinder.io/api/nz/location/info?${query}`;

    const { updateSearchParams } = this.props;
    return axios.get(url).then(res => {
      const { x: lng, y: lat } = res.data;
      updateSearchParams({ latitude: lat, longitude: lng, region: a });
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then(suggestions => this.setState({ suggestions }));
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { suggestions } = this.state;
    const { autoSuggestValue } = this.props;
    const inputProps = {
      placeholder: 'Start typing an address',
      value: autoSuggestValue,
      onChange: this.onChange.bind(this),
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
