import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
    userLocation: PropTypes.object,
    mappedProvider: PropTypes.object,
  };

  render() {
    const {
      index,
      userLocation,
      mappedProvider,
    } = this.props;

    return (
      <Card result-index={index} className="service">
        <CardContent>
          <ServiceHeader
            userLocation={userLocation}
            mappedProvider={mappedProvider}
          />
          {mappedProvider.purpose &&
          <blockquote className="service__purpose service__purpose--truncatable">{mappedProvider.purpose}</blockquote>}
          <footer className="service__footer">
            {mappedProvider.classification && <ServiceClassification classification={mappedProvider.classification}/>}
          </footer>
        </CardContent>
        <div>
        </div>
        <CardActions className="justify-content-around">
          <Link to={`/service/${mappedProvider.fsdId}`}
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-contained MuiButton-containedPrimary"
          >
            More details
          </Link>
          <SaveContact
            name={mappedProvider.name}
            phoneNumber={mappedProvider.phone}
            address={mappedProvider.address}
            email={mappedProvider.email}
          />
        </CardActions>
      </Card>
    );
  }
}
