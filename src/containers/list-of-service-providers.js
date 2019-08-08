import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceProviderResult from '../components/service-provider-result';
import uniqueServices from '../utilities/uniqueServices';

export default class ListOfServiceProviders extends Component {
  static propTypes = {
    serviceProviders: PropTypes.array.isRequired,
    userLocation: PropTypes.object,
  };

  render() {
    const { serviceProviders, userLocation } = this.props;

    if (serviceProviders.length > 0) {
      return (
        <section className="service__container">
          {uniqueServices(serviceProviders, 'PROVIDER_NAME').map(
            (provider, index) => (
              <ServiceProviderResult
                key={provider.FSD_ID}
                index={index}
                provider={provider}
                userLocation={userLocation}
              />
            )
          )}
        </section>
      );
    } else {
      return (
        <section className="service__container">
          <header className="service__header">
            <h2>Make a search or choose a category above.</h2>
          </header>
        </section>
      );
    }
  }
}
