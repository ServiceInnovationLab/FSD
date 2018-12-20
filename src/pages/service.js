import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Page from '../containers/page';
import ServiceProvider from '../components/service-provider';
import ServiceDetails from '../components/service-details';
import MapContainer from '../containers/map-container';

import { loadService } from '../utilities/api';

export default class Service extends Component {
  state = {
    purpose: '',
    address: '',
    classification: '',
    contactAvailability: '',
    name: '',
    website: '',
    email: '',
    phoneNumber: '',

    serviceName: '',
    targetAudiences: '',
    deliveryMethods: '',
    serviceReferrals: '',
    costType: '',
    costDescription: '',
    serviceDetail: '',

    latitude: '',
    longitude: '',

    loading: true
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;

    loadService(id).then(providers => {
      const provider = providers[0];

      this.setState({
        loading: false,
        purpose: provider.ORGANISATION_PURPOSE,
        address: provider.PHYSICAL_ADDRESS,
        classification: provider.PROVIDER_CLASSIFICATION,
        contactAvailability: provider.PROVIDER_CONTACT_AVAILABILITY,
        name: provider.PROVIDER_NAME,
        website: provider.PROVIDER_WEBSITE_1,
        email: provider.PUBLISHED_CONTACT_EMAIL_1,
        phoneNumber: provider.PUBLISHED_PHONE_1,

        serviceName: provider.SERVICE_NAME,
        targetAudiences: provider.SERVICE_TARGET_AUDIENCES,
        deliveryMethods: provider.DELIVERY_METHODS,
        serviceReferrals: provider.SERVICE_REFERRALS,
        costType: provider.COST_TYPE,
        costDescription: provider.COST_DESCRIPTION,
        serviceDetail: provider.SERVICE_DETAIL,

        latitude: provider.LATITUDE,
        longitude: provider.LONGITUDE
      });
    });
  };

  render() {
    const { id } = this.props.match.params;
    const {
      loading,

      purpose,
      address,
      classification,
      contactAvailability,
      name,
      website,
      email,
      phoneNumber,

      serviceName,
      targetAudiences,
      deliveryMethods,
      serviceReferrals,
      costType,
      costDescription,
      serviceDetail,

      latitude,
      longitude
    } = this.state;

    const mapPoint = [
      {
        LATITUDE: latitude,
        LONGITUDE: longitude
      }
    ];

    return (
      <Page className="service__page">
        <header>
          <Link className="icon-prefix__container button back-button" to="/">
            <div className="icon-prefix__icon">
              <Icon icon={faChevronLeft} />
            </div>
            <span className="icon-prefix__label">Go back</span>
          </Link>

          {!loading && (
            <Fragment>
              <ServiceProvider
                fsdId={id}
                purpose={purpose}
                address={address}
                classification={classification}
                contactAvailability={contactAvailability}
                name={name}
                website={website}
                email={email}
                phoneNumber={phoneNumber}
                hideMoreDetails={true}
              />
              <ServiceDetails
                serviceName={serviceName}
                targetAudiences={targetAudiences}
                deliveryMethods={deliveryMethods}
                serviceReferrals={serviceReferrals}
                costType={costType}
                costDescription={costDescription}
                serviceDetail={serviceDetail}
              />
              <MapContainer serviceProviders={mapPoint} />
            </Fragment>
          )}
        </header>
      </Page>
    );
  }
}
