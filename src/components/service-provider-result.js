import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import ServiceHeader from './service-header';
import SaveContact from './save-contact';
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
        PROVIDER_NAME: name,
        PHYSICAL_ADDRESS: address,
        PUBLISHED_CONTACT_EMAIL_1: email,
        PUBLISHED_PHONE_1: phone,
      },
      userLocation,
    } = this.props;

    return (
      <Card result-index={index} className="service">
        <CardContent>
          {process.env.REACT_APP_DISPLAY_INDEX && (<div>{index+1}</div>) }
          {process.env.REACT_APP_DISPLAY_INDEX && (<div>{provider.rank}</div>) }
          <ServiceHeader
            provider={provider}
            userLocation={userLocation}
          />

          {purpose && <blockquote className="service__purpose service__purpose--truncatable">{purpose}</blockquote>}

          <footer className="service__footer">
            {classification && <ServiceClassification classification={classification} />}
          </footer>
        </CardContent>
        <div>
        </div>
        <CardActions>
          <Button color="primary" variant="contained">
            <Link to={`/service/${fsdId}`}>
              More details
            </Link>
          </Button>
          <SaveContact
            name={name}
            phoneNumber={phone}
            address={address}
            email={email}
            />
        </CardActions>
      </Card>
    );
  }
}
