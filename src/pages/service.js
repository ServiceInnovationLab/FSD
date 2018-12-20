import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Page from '../containers/page';
import ServiceProvider from '../components/service-provider';

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
        phoneNumber: provider.PUBLISHED_PHONE_1
      });
    });
  };

  render() {
    const { id } = this.props.match.params;
    const { loading } = this.state;

    return (
      <Page>
        <header>
          <Link to="/">Go back</Link>
          {!loading && <ServiceProvider {...this.state} fsdId={id} hideMoreDetails={true} />}
        </header>
      </Page>
    );
  }
}
