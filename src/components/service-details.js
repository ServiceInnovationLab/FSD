import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';

export default class Service extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
  };

  render() {
    const {
      expanded,
      service: {
        COST_TYPE: costType,
        COST_DESCRIPTION: costDescription,
        DELIVERY_METHODS: deliveryMethods,
        SERVICE_NAME: serviceName,
        SERVICE_REFERRALS: serviceReferrals,
        SERVICE_DETAIL: serviceDetail,
      }
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
        {serviceName !== serviceDetail && <p>{serviceDetail}</p>}
        <ul>
          {deliveryMethods && (
            <li>
              <b>Delivery Methods:</b> {deliveryMethods}
            </li>
          )}
          {costDescription && (
            <li>
              <b>Cost:</b> {costType}. {costDescription}
            </li>
          )}
          {serviceReferrals && (
          <li>
            <b>Referrals:</b> {serviceReferrals}
          </li>
          )}
        </ul>
      </AccordionItemBody>
    </AccordionItem>
    );
  }
}
