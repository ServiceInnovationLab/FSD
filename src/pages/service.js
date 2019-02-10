import React, { Component, Fragment } from 'react';
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

    loading: true,
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;

    loadService(id).then(args => {
      const { provider, services } = args;

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

        //TODO this is limited to only showing one service until the page design
        //is updated
        services: services.slice(0, 1),

        latitude: provider.LATITUDE,
        longitude: provider.LONGITUDE,
      });
    });
  };

  render() {
    const {
      match: {
        params: { id },
      },
      history: { goBack },
    } = this.props;
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

      services,

      latitude,
      longitude,
    } = this.state;

    const providerMap =
      latitude && longitude ? (
        <MapContainer
          serviceProviders={[{ LATITUDE: latitude, LONGITUDE: longitude }]}
        />
      ) : null;
    return (
      <Page className="service__page">
        <header>
          <button
            className="icon-prefix__container button back-button"
            onClick={goBack}
          >
            <div className="icon-prefix__icon">
              <Icon icon={faChevronLeft} />
            </div>
            <span className="icon-prefix__label">Go back</span>
          </button>

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
              {services.map((service, i) => (
                <ServiceDetails
                  key={i}
                  serviceName={service.SERVICE_NAME}
                  targetAudiences={service.SERVICE_TARGET_AUDIENCES}
                  deliveryMethods={service.DELIVERY_METHODS}
                  serviceReferrals={service.SERVICE_REFERRALS}
                  costType={service.COST_TYPE}
                  costDescription={service.COST_DESCRIPTION}
                  serviceDetail={service.SERVICE_DETAIL}
                />
              ))}
              {providerMap}
            </Fragment>
          )}
        </header>
      </Page>
    );
  }
}
