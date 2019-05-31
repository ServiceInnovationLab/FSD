import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLink, faClock, faPhone, faMapMarkerAlt, faAt } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';

import { stripSpaces } from '../utilities/string';
import SaveContact from './save-contact';
import ServiceClassification from './service-classification';

import { MDBCard, MDBCardHeader, MDBCardTitle, MDBCardBody, MDBCardImage, MDBCardFooter , MDBNav} from 'mdbreact';

export default class ServiceHeader extends Component {
  static propTypes = {
    provider: PropTypes.object.isRequired,
    userLatitude: PropTypes.string,
    userLongitude: PropTypes.string
  };

  render() {
    const {
      provider: {
        FSD_ID: fsdId,
        PROVIDER_NAME: name,
        PHYSICAL_ADDRESS: address,
        PROVIDER_CONTACT_AVAILABILITY: availability,
        PROVIDER_WEBSITE_1: website,
        PUBLISHED_CONTACT_EMAIL_1: email,
        PUBLISHED_PHONE_1: phone,
        LATITUDE: latitude,
        LONGITUDE: longitude
      },
      userLatitude,
      userLongitude
    } = this.props;

    // The location of the user, if supplied. Used as the origin when preparing
    // directions to the provider. The coordinates will be passed through to the
    // service detail page in the URL query string, although other query string
    // values will not.
    const userCoordinates = (userLatitude && userLongitude)
      ? queryString.stringify({ latitude: userLatitude, longitude: userLongitude })
      : null;

    // The url to use for directions to the provider.
    //
    // Happily if the user location is not available we can still populate the
    // destination and the user just needs to put their own address into Google.
    const directionsUrl = (userLatitude && userLongitude)
      ? `https://www.google.com/maps/dir/${userLatitude},${userLongitude}/${latitude},${longitude}`
      : `https://www.google.com/maps/dir//${latitude},${longitude}`

    return (
      <MDBCard result-index={this.props.index_number}>
        <MDBCardHeader>
          {process.env.REACT_APP_DISPLAY_INDEX &&
            <p className="text-muted float-right">{this.props.index_number }</p>
          }
          {this.props.classification &&
            <p>
              <ServiceClassification classification={this.props.classification} />
            </p>
          }
          <h2 className="service__name">
            <Link to={{
              pathname: `/service/${fsdId}`,
              search: userCoordinates
              }}>
                {name}
            </Link>
          </h2>
        </MDBCardHeader>
        <MDBCardBody>
          <header className="service__header">
            <address className="service__address">
              {address && (
                <div className="icon-prefix__container">
                  <div className="icon-prefix__icon">
                    <Icon icon={faMapMarkerAlt} />
                  </div>
                  <div className="icon-prefix__label">
                    {address} - <a href={directionsUrl}>Directions</a>
                  </div>
                </div>
              )}
              {website && (
                <div className="icon-prefix__container">
                  <div className="icon-prefix__icon">
                    <Icon icon={faLink} />
                  </div>
                  <a className="icon-prefix__label" href={website} target="_blank" rel="noopener noreferrer">
                    {website}
                  </a>
                </div>
              )}
              {availability && (
                <div className="icon-prefix__container">
                  <div className="icon-prefix__icon">
                    <Icon icon={faClock} />
                  </div>
                  <div className="icon-prefix__label">{availability}</div>
                </div>
              )}
              {email && (
                <div className="icon-prefix__container">
                  <div className="icon-prefix__icon">
                    <Icon icon={faAt} />
                  </div>
                  <a className="icon-prefix__label" href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                    {email}
                  </a>
                </div>
              )}
              {phone && (
                <div className="icon-prefix__container">
                  <div className="icon-prefix__icon">
                    <Icon icon={faPhone} />
                  </div>
                  <a
                    className="icon-prefix__label"
                    href={`tel:${stripSpaces(phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {phone}
                  </a>
                </div>
              )}
            </address>
          </header>
          <SaveContact name={name} phoneNumber={phone} address={address} email={email} />
        </MDBCardBody>
      </MDBCard>
    );
  }
}
