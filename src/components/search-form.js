import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import AutoSuggest from '../containers/auto-suggest';

export default class SearchForm extends Component {
  static propTypes = {
    autoSuggestOnChange: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    doResetSearch: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    updateSearchParams: PropTypes.func.isRequired,
    showExtraButtons: PropTypes.bool.isRequired,
  };

  onSubmit(values) {
    const { dirtyFields } = arguments[1].getState();
    Object.keys(dirtyFields).forEach(field => {
      if (!values[field] && !(values[field] === 'undefined')) values[field] = '';
    });

    this.props.updateSearchParams(values);
  }

  render() {
    const {
      initialValues,
      updateSearchParams,
      doResetSearch,
      showExtraButtons,
      autoSuggestOnChange,
      address,
      region,
    } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit.bind(this)}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="searchBox" className="search__addressLabel">Address</label>
              <AutoSuggest
                updateSearchParams={updateSearchParams}
                autoSuggestOnChange={autoSuggestOnChange}
                address={address ? address : region}
              />
            </div>
            <div className="search__topic">
              <Field name="keyword" component="input" type="text" aria-label="Enter topic or organisation" placeholder="Enter topic or organisation" />
              <button type="submit" className="search__magnifying-glass" onClick={() => handleSubmit(form)} disabled={submitting || pristine} aria-label="Magnifying glass">Magnifying Glass</button>
            </div>

            {showExtraButtons ? (
              <button type="button" onClick={() => doResetSearch(form)} disabled={submitting}>
                Reset Search
              </button>
            ) : null}
          </form>
        )}
      />
    );
  }
}
