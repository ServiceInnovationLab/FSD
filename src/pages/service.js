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

    loading: true
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;

    loadService(id).then(providers => {

      // The API can return a list of results, including a duplicate for each
      // type of service offered by the organisation or even other organisations
      // which are (somehow) related.
      //
      // The provider object from the API has properties including fsdId, FSDID
      // and FSD_ID. In the examples I've seen the fsdId and FSDID can apply to
      // multiple providers, but the FSD_ID specifies the provider we were
      // expecting. Also the FSD_ID is the first field returned in the server
      // response which implies it's the primary key.
      //
      // It's also worth noting that the records which describe additional
      // services from the same provider are being ignored currently, and the
      // details for whichever service is arbitrarily listed first are
      // displayed. TODO render the services in a list.
      const selectAppropriateResult = (fsdId, providers) => {
        return providers.filter(r => r.FSD_ID === Number(fsdId))[0]
      }

      const provider = selectAppropriateResult(id, providers);

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
    const { match: {params: {id}}, history: {goBack} } = this.props;
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
          <button className="icon-prefix__container button back-button" onClick={goBack}>
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
