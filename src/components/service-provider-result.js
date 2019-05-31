import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceHeader from './service-header';
import ServiceClassification from './service-classification';
import { MDBCard, MDBCardHeader, MDBCardTitle, MDBCardBody, MDBCardImage, MDBCardFooter , MDBNav} from 'mdbreact';

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
      <MDBCard result-index={index}>
        <MDBCardBody>
          <p className="text-muted float-right">{process.env.REACT_APP_DISPLAY_INDEX && index+1 }</p>
          <p>{classification && <ServiceClassification classification={classification} />}</p>
          <ServiceHeader
            provider={provider}
            userLatitude={userLatitude}
            userLongitude={userLongitude}
          />
          {purpose && <blockquote className="service__purpose service__purpose--truncatable">{purpose}</blockquote>}
        </MDBCardBody>
      </MDBCard>
    );
  }
}
