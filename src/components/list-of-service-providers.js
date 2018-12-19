import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListOfServiceProviders extends Component {
  static propTypes = {
    serviceProviders: PropTypes.array
  };


  render() {
    const {
      // history: {
        // location,
      //   push
      // },
      serviceProviders
    } = this.props;

    return (
      <div>
        {serviceProviders.map((provider, key) => {
          const { PROVIDER_CLASSIFICATION, PROVIDER_NAME } = provider
          return (
            <div key={`service-${key}`}>
            {PROVIDER_NAME}
            {PROVIDER_CLASSIFICATION}
            </div>
          )
        }
      )}
      </div>
    );
  }

}
