import Autosuggest from 'react-autosuggest';
import React from 'react';
import { getSuggestions, getAddressMetadata } from '../utilities/addressfinder';

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
    if(newValue === '') {
      const {updateSearchParams} = this.props;
      updateSearchParams({ latitude: '', longitude: '', region: ''});
    }

    this.props.autoSuggestOnChange(newValue)
  };

  onSuggestionSelected = (event, {suggestion: {pxid, a}}) => {
    const {updateSearchParams} = this.props

    return getAddressMetadata(pxid)
      .then(res => {
        const { x: lng, y: lat} = res.data
        updateSearchParams({ latitude: lat, longitude: lng, region: a})
      });
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
      placeholder: 'Enter a location',
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