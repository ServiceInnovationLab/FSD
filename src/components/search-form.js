import React, { Component, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import AutoSuggest from '../containers/auto-suggest';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';


const radiusOptions = ['10', '25', '50', '100'];
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
      <MDBContainer>
      <Form
        onSubmit={this.onSubmit.bind(this)}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="search__topic">
              <label htmlFor="searchBox" className="search__addressLabel">Address</label>
              <AutoSuggest
                updateSearchParams={updateSearchParams}
                autoSuggestOnChange={autoSuggestOnChange}
                address={address ? address : region}
              />
            </div>
            {address
              ? (
            <div className="search__topic">
              <div className="form-group">
                    <legend>Distance (km):</legend>
                      {radiusOptions.map(radius => {
                        let selected = (radius !== initialValues.radius)
                        return (
                          <label className="radius-label" key={radius}>
                            <MDBBtn
                              flat={selected}
                              type="button"
                              name="radius"
                              value={radius}
                              color="success"
                              onClick={()=>  updateSearchParams({radius: radius})
                              }
                            >{radius}</MDBBtn>
                          </label>
                        );
                      })}
                  </div>
                  </div>)
              : null
            }
            <MDBRow>
              <MDBCol>
                  <Field
                    group
                    name="keyword"
                    component="input"
                    type="text"
                    >
                    {({ input, meta }) => (
                      <Fragment>
                        <MDBInput
                          {...input}
                          size="lg"
                          placeholder="Enter topic or organisation"
                          label="keyword"
                          aria-label="Enter topic or organisation"
                          />
                        {meta.touched && meta.error && <span>{meta.error}</span>}
                      </Fragment>
                    )}
                  </Field>
                  <MDBBtn
                    group
                    color="success"
                    type="submit"
                    onClick={() => handleSubmit(form)}
                    aria-label="search"
                    >
                      <Icon icon={faSearch} />
                      Search
                    </MDBBtn>

            {showExtraButtons ? (
              <p className="float-right">

              <MDBBtn
                color="warning"
                onClick={() => doResetSearch(form)} disabled={submitting}
                >
                  <div className="icon-prefix__container">
                    <div>
                      <Icon icon={faTimesCircle} />
                    </div>
                    Reset Search
                  </div>
              </MDBBtn>
              </p>
            ) : null}
              </MDBCol>
            </MDBRow>
          </form>
        )}
      />
      </MDBContainer>
    );
  }
}
