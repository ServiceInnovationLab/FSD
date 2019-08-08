import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ServiceHeader from './service-header';
import ServiceClassification from './service-classification';

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
        FSD_ID: fsdId,
        PROVIDER_CLASSIFICATION: classification,
        ORGANISATION_PURPOSE: purpose,
      },
      userLocation,
    } = this.props;

    return (
      <section className="service" result-index={index}>
        {process.env.REACT_APP_DISPLAY_INDEX && <div>{index + 1}</div>}
        {process.env.REACT_APP_DISPLAY_INDEX && <div>{provider.rank}</div>}
        <ServiceHeader provider={provider} userLocation={userLocation} />

        {purpose && (
          <blockquote className="service__purpose service__purpose--truncatable">
            {purpose}
          </blockquote>
        )}

        <footer className="service__footer">
          {classification && (
            <ServiceClassification classification={classification} />
          )}
        </footer>
        <Link className="button" to={`/service/${fsdId}`}>
          More details
        </Link>
      </section>
    );
  }
}
