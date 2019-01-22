import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import React from 'react'

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const url = `https://api.addressfinder.io/api/nz/location?key=ADDRESSFINDER_DEMO_KEY&secret=ADDRESSFINDER_DEMO_SECRET&q=${value}&format=json&strict=2`

  if (inputLength === 0) return []
  
  return axios.get(url)
    .then(response => {
      return response.data.completions
    });
};

const getSuggestionValue = suggestion => suggestion.a;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.a}
  </div>
);

export default class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: []
    };
  }

  onChange (event, { newValue }) {
    this.props.autoSuggestOnChange(newValue)
  };

  onSuggestionSelected = (evt, {suggestion: {pxid, a}}) => {
    const url = `https://api.addressfinder.io/api/nz/location/info?key=ADDRESSFINDER_DEMO_KEY&secret=ADDRESSFINDER_DEMO_SECRET&format=json&pxid=${pxid}`
    const {doLoadResults} = this.props 
    return axios.get(url)
      .then(res => {
        const { x: lng, y: lat} = res.data
        doLoadResults({ latitude: lat, longitude: lng })
      });
  }
  onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then(suggestions => this.setState({suggestions}))
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { suggestions } = this.state;
    const {autoSuggestValue} = this.props
    const inputProps = {
      placeholder: 'Enter a location',
      value: autoSuggestValue,
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