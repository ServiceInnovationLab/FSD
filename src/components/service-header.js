import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLink, faClock, faPhone, faMapMarkerAlt, faAt } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';

import { stripSpaces } from '../utilities/string';
import SaveContact from './save-contact';

export default class ServiceHeader extends Component {
  static propTypes = {
    fsdId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    address: PropTypes.string,
    contactAvailability: PropTypes.string,
    name: PropTypes.string.isRequired,
    website: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  };

  render() {
    const {
      fsdId,
      address,
      contactAvailability,
      name,
      website,
      email,
      phoneNumber,
      userLatitude,
      userLongitude,
      providerLatitude,
      providerLongitude
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
      ? `https://www.google.com/maps/dir/${userLatitude},${userLongitude}/${providerLatitude},${providerLongitude}`
      : `https://www.google.com/maps/dir//${providerLatitude},${providerLongitude}`

    return (
      <header className="service__header">
        <h2 className="service__name">
          <Link to={{
            pathname: `/service/${fsdId}`, 
            search: userCoordinates
            }}>
              {name}
          </Link>
        </h2>
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
          {contactAvailability && (
            <div className="icon-prefix__container">
              <div className="icon-prefix__icon">
                <Icon icon={faClock} />
              </div>
              <div className="icon-prefix__label">{contactAvailability}</div>
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
          {phoneNumber && (
            <div className="icon-prefix__container">
              <div className="icon-prefix__icon">
                <Icon icon={faPhone} />
              </div>
              <a
                className="icon-prefix__label"
                href={`tel:${stripSpaces(phoneNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {phoneNumber}
              </a>
            </div>
          )}
          <SaveContact
            name={name}
            phoneNumber={phoneNumber}
            address={address}
            email={email}
            />
        </address>
      </header>
    );
  }
}