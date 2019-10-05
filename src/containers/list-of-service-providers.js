import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceProviderResult from '../components/service-provider-result';
import uniqueServices from '../utilities/uniqueServices';
import providerDetails from '../utilities/providerDetails';

export default class ListOfServiceProviders extends Component {
  static propTypes = {
    serviceProviders: PropTypes.array.isRequired,
    userLocation: PropTypes.object,
  };

  render() {
    const { serviceProviders, userLocation } = this.props;

    if (serviceProviders.length > 0) {
      return (
        <div>
          {uniqueServices(serviceProviders, 'PROVIDER_NAME').map((provider, index) => (
            <ServiceProviderResult
              key={provider.FSD_ID}
              index={index}
              userLocation={userLocation}
              mappedProvider={providerDetails(provider)}
            />
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
