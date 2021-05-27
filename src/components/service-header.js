import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faLink, faClock, faPhone, faMapMarkerAlt, faAt} from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';

import {stripSpaces} from '../utilities/string';

export default class ServiceHeader extends Component {
  static propTypes = {
    mappedProvider: PropTypes.object.isRequired,
    userLocation: PropTypes.object
  };

  render() {
    const {
      mappedProvider,
      userLocation,
    } = this.props;

    // The location of the user, if supplied. Used as the origin when preparing
    // directions to the provider. The coordinates will be passed through to the
    // service detail page in the URL query string, although other query string
    // values will not.
    const userCoordinates = userLocation
      ? queryString.stringify({address: userLocation.address, latitude: userLocation.lat, longitude: userLocation.lng})
      : null;

    // The url to use for directions to the provider.
    //
    // Happily if the user location is not available we can still populate the
    // destination and the user just needs to put their own address into Google.
    const directionsUrl =
      userLocation
        ? `https://maps.google.com/maps?saddr=${userLocation.address}&daddr=${mappedProvider.address}`
        : `https://maps.google.com/maps?daddr=${mappedProvider.address}`

    return (
      <header className="service__header">
        <h2 className="service__name">
          <Link to={{
            pathname: `/service/${mappedProvider.fsdId}`,
            search: userCoordinates
          }}>
            {mappedProvider.name}
          </Link>
        </h2>
        <address className="service__address service__section">
          {mappedProvider.address && (
            <div className="icon-prefix__container">
              <div className="icon-prefix__icon">
                <Icon icon={faMapMarkerAlt}/>
              </div>
              <div className="icon-prefix__label">
                {mappedProvider.address} - <a href={directionsUrl}>Directions</a>
              </div>
            </div>
          )}
          {mappedProvider.website && (
            <div className="icon-prefix__container">
              <div className="icon-prefix__icon">
                <Icon icon={faLink}/>
              </div>
              <a className="icon-prefix__label" href={mappedProvider.website} target="_blank" rel="noopener noreferrer">
                {mappedProvider.website}
              </a>
            </div>
          )}
          {mappedProvider.availability && (
            <div className="icon-prefix__container">
              <div className="icon-prefix__icon">
                <Icon icon={faClock}/>
              </div>
              <div className="icon-prefix__label">{mappedProvider.availability}</div>
            </div>
          )}
          {mappedProvider.email && (
            <div className="icon-prefix__container">
              <div className="icon-prefix__icon">
                <Icon icon={faAt}/>
              </div>
              <a className="icon-prefix__label" href={`mailto:${mappedProvider.email}`} target="_blank"
                 rel="noopener noreferrer">
                {mappedProvider.email}
              </a>
            </div>
          )}
          {mappedProvider.phone && (
            <div className="icon-prefix__container">
              <div className="icon-prefix__icon">
                <Icon icon={faPhone}/>
              </div>
              <a
                className="icon-prefix__label"
                href={`tel:${stripSpaces(mappedProvider.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {mappedProvider.phone}
              </a>
            </div>
          )}
        </address>
      </header>
    );
  }
}
