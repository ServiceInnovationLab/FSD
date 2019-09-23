import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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
        <CardActions>
          <SaveContact
            name={provider.name}
            phoneNumber={provider.phone}
            address={provider.address}
            email={provider.email}
            />
          <Link to={`/service/${fsdId}`} className="MuiButtonBase-root MuiButton-root MuiButton-text">
            More details
          </Link>
        </CardActions>
      </Card>
    );
  }
}
