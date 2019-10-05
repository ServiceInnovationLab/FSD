import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import AutoSuggest from '../containers/auto-suggest';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ServiceCategories from '../components/service-categories';
var scrollToElement = require('scroll-to-element');

export default class SearchForm extends Component {
  static propTypes = {
    autoSuggestOnChange: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    doResetSearch: PropTypes.func.isRequired,
    doSetCategory: PropTypes.func.isRequired,
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
    scrollToElement('#results');
  }

  render() {
    const {
      initialValues,
      updateSearchParams,
      doResetSearch,
      showExtraButtons,
      autoSuggestOnChange,
      doSetCategory,
      address,
      region,
    } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit.bind(this)}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="search__section">
              <ServiceCategories doSetCategory={doSetCategory} />
            </div>
            <div className="search__section">
              <label className="small-label">Search for</label>
              <Field name="keyword" aria-label="Enter topic or organisation">
                {props => (
                  <div>
                    <TextField
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                      placeholder="Enter topic or organisation"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="search__section">
              <AutoSuggest
                updateSearchParams={updateSearchParams}
                autoSuggestOnChange={autoSuggestOnChange}
                address={address ? address : region}
              />
            </div>
            <div className="search__section d-flex justify-content-between">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={() => handleSubmit(form)}
                aria-label="Search"
              >
                <SearchIcon />
                Search
              </Button>

              {showExtraButtons ? (
                <button type="button" onClick={() => doResetSearch(form)} disabled={submitting} className="reset">
                  Reset search
                </button>
              ) : null}
            </div>
          </form>
        )}
      />
    );
  }
}
