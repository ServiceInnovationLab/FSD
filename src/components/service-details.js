import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Service extends Component {
  static propTypes = {
    serviceName: PropTypes.string,
    targetAudiences: PropTypes.string,
    deliveryMethods: PropTypes.string,
    serviceReferrals: PropTypes.string,
    costType: PropTypes.string.isRequired,
    costDescription: PropTypes.string,
    serviceDetail: PropTypes.string
  };

  render() {
    const {
      serviceName,
      targetAudiences,
      deliveryMethods,
      serviceReferrals,
      costType,
      costDescription,
      serviceDetail
    } = this.props;

    return (
      <div>
        <h3>{serviceName}</h3>
        <ul>
          {targetAudiences && (
            <li>
              <b>Target Audience:</b> {targetAudiences}
            </li>
          )}
          {deliveryMethods && (
            <li>
              <b>Delivery Methods:</b> {deliveryMethods}
            </li>
          )}
          {serviceReferrals && (
            <li>
              <b>Service Referrals:</b> {serviceReferrals}
            </li>
          )}
          <li>
            <b>Cost:</b>
            {costType && <span> {costType}. </span>}
            {costDescription && <span>{costDescription}</span>}
          </li>
        </ul>
        {serviceName !== serviceDetail && <p>{serviceDetail}</p>}
      </div>
    );
  }
}
