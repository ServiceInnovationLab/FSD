import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import AutoSuggest from '../containers/auto-suggest'

export default class SearchForm extends Component {
  static propTypes = {
    autoSuggestOnChange: PropTypes.func.isRequired, 
    autoSuggestValue: PropTypes.string.isRequired,
    doResetSearch: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    updateSearchParams: PropTypes.func.isRequired,
    showExtraButtons: PropTypes.bool.isRequired
  };

  onSubmit (values) {
    const {dirtyFields} = arguments[1].getState()
    Object.keys(dirtyFields).forEach(field => {
      if (!values[field] && !(values[field] === 'undefined')) values[field] = ''
    })
    
    this.props.updateSearchParams(values)
  }
  
  render() {
    const { initialValues, updateSearchParams, doResetSearch, showExtraButtons, autoSuggestOnChange, autoSuggestValue } = this.props
    return (
      <Form
        onSubmit={this.onSubmit.bind(this)}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name='keyword'
                component='input'
                type='text'
                placeholder='Enter topic or organisations'
                onBlur={this.onBlur}
              />
            </div>
            <div>
              <AutoSuggest
                updateSearchParams={updateSearchParams}
                autoSuggestOnChange={autoSuggestOnChange}
                autoSuggestValue={autoSuggestValue}
              />
            </div>
            <button type='submit' disabled={submitting}>
              Search
            </button>
            { showExtraButtons
              ? <button
                  type='button'
                  onClick={() => doResetSearch(form)}
                  disabled={submitting}
                >
                  Reset form
                </button>
              : null
            }
          </form>
        )}
      />
    );
  }}
