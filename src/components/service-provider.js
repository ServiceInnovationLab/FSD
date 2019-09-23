import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SaveContact from './save-contact';
import ServiceHeader from './service-header';
import ServiceClassification from './service-classification';

export default class ServiceProviders extends Component {
  static propTypes = {
    userLocation: PropTypes.object,
    mappedProvider: PropTypes.object.isRequired,
  };

  render() {
    const {
      mappedProvider,
      userLocation,
    } = this.props;

    return (
      <section className="service">
        <ServiceHeader
          mappedProvider={mappedProvider}
          userLocation={userLocation}
        />

        {mappedProvider.purpose && <blockquote className="service__purpose">
            {mappedProvider.purpose}
          </blockquote>}

        <footer className="service__footer">
          {mappedProvider.classification && <ServiceClassification classification={mappedProvider.classification} />}
        </footer>
        <SaveContact
          name={mappedProvider.name}
          phoneNumber={mappedProvider.phone}
          address={mappedProvider.address}
          email={mappedProvider.email}
          />
      </section>
    );
  }
}
