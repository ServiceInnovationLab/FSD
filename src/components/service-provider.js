import React, { Component } from 'react';
import PropTypes from 'prop-types';


import ServiceHeader from './service-header';
import ServiceClassification from './service-classification';

export default class ServiceProviders extends Component {
  static propTypes = {
    provider: PropTypes.object.isRequired,
    userLatitude: PropTypes.string,
    userLongitude: PropTypes.string
  };

  render() {
    const {
      provider,
      provider: {
        PROVIDER_CLASSIFICATION: classification,
        ORGANISATION_PURPOSE: purpose,
      },
      userLatitude,
      userLongitude,
    } = this.props;

    return (
      <section className="service">
        <ServiceHeader
          provider={provider}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />

        {purpose && <blockquote className="service__purpose">
            {purpose}
          </blockquote>}

        <footer className="service__footer">
          {classification && <ServiceClassification classification={classification} />}
        </footer>
      </section>
    );
  }
}
