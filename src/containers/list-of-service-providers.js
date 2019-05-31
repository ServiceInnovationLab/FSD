import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceProviderResult from '../components/service-provider-result';
import uniqueServices from '../utilities/uniqueServices';
import { MDBCard, MDBCardHeader, MDBCardTitle, MDBCardBody, MDBCardImage } from 'mdbreact';

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
        <section>
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
        <MDBCard>
          <MDBCardHeader>
            <MDBCardTitle>Make a search or choose a category above.</MDBCardTitle>
          </MDBCardHeader>
        </MDBCard>
      );
    }
  }
}
