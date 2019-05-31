import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceProviderResult from '../components/service-provider-result';
import uniqueServices from '../utilities/uniqueServices';

export default class ListOfServiceProviders extends Component {
  static propTypes = {
    serviceProviders: PropTypes.array.isRequired,
    userLatitude: PropTypes.string,
    userLongitude: PropTypes.string
  };

  render() {
    const {
      serviceProviders,
      userLatitude,
      userLongitude
    } = this.props;

    if (serviceProviders.length > 0) {
      return (
        <section className="service__container">
        {uniqueServices(serviceProviders, 'PROVIDER_NAME')
          .map((provider, index) => (
            <ServiceProviderResult
              key={provider.FSD_ID}
              index={index}
              provider={provider}
              userLatitude={userLatitude}
              userLongitude={userLongitude}
            />
          ))}
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
