import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceHeader from './service-header';

export default class ServiceProviderResult extends Component {
  static propTypes = {
    index: PropTypes.number,
    provider: PropTypes.object.isRequired,
    userLocation: PropTypes.object,
  };

  render() {
    const {
      index,
      provider,
      provider: {
        PROVIDER_CLASSIFICATION: classification,
        ORGANISATION_PURPOSE: purpose,
      },
      userLocation,
    } = this.props;

    return (
      <section className="service" result-index={index}>
        {process.env.REACT_APP_DISPLAY_INDEX && index+1 }
        <ServiceHeader
          provider={provider}
          userLocation={userLocation}
        />

        {purpose && <blockquote className="service__purpose service__purpose--truncatable">{purpose}</blockquote>}

        <footer className="service__footer">
          {classification && <ServiceClassification classification={classification} />}
        </footer>
      </section>
    );
  }
}
