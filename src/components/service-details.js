import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

export default class Service extends Component {
  static propTypes = {
    costType: PropTypes.string.isRequired,
    costDescription: PropTypes.string,
    deliveryMethods: PropTypes.string,
    expanded: PropTypes.bool,
    serviceReferrals: PropTypes.string,
    serviceDetail: PropTypes.string,
    serviceName: PropTypes.string,
    targetAudiences: PropTypes.string,

  };

  render() {
    const {
      costType,
      costDescription,
      deliveryMethods,
      expanded,
      targetAudiences,
      serviceName,
      serviceReferrals,
      serviceDetail,
    } = this.props;

    return (
    <AccordionItem expanded={expanded}>
      <AccordionItemTitle>
        <h3 className=" u-position-relative u-margin-bottom-s">
          {serviceName}
          <div className="accordion__arrow" role="presentation" />
        </h3>
      </AccordionItemTitle>
      <AccordionItemBody>
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
      </AccordionItemBody>
    </AccordionItem>
    );
  }
}
