import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ServiceHeader from './service-header';
import ServiceClassification from './service-classification';

export default class ServiceProviderResult extends Component {
  static propTypes = {
    index: PropTypes.number,
    provider: PropTypes.object.isRequired,
    userLatitude: PropTypes.string,
    userLongitude: PropTypes.string
  };

  render() {
    const {
      index,
      provider,
      provider: {
        PROVIDER_CLASSIFICATION: classification,
        ORGANISATION_PURPOSE: purpose,
      },
      userLatitude,
      userLongitude,
    } = this.props;

    return (
        <Fragment>
          <ServiceHeader
            index_number={index+1}
            classification={classification}
            provider={provider}
            userLatitude={userLatitude}
            userLongitude={userLongitude}
          />
          {purpose &&
            <blockquote className="shadow service__purpose service__purpose--truncatable">{purpose}</blockquote>
          }
          <hr/>
        </Fragment>
    );
  }
}
