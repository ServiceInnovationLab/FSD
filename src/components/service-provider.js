import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLink, faClock, faPhone, faMapMarkerAlt, faAt, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import { stripSpaces } from '../utilities/string';

export default class ServiceProviders extends Component {
  static propTypes = {
    fsdId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    purpose: PropTypes.string,
    address: PropTypes.string,
    classification: PropTypes.string,
    contactAvailability: PropTypes.string,
    name: PropTypes.string.isRequired,
    website: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    hideMoreDetails: PropTypes.bool,
  };

  render() {
    const {
      fsdId,
      purpose,
      address,
      classification,
      contactAvailability,
      name,
      website,
      email,
      phoneNumber,
      hideMoreDetails,
    } = this.props;

    return (
      <section className="service">
        <header className="service__header">
          <h2 className="service__name">
            <Link to={`/service/${fsdId}`}>{name}</Link>
          </h2>
          <address className="service__address">
            {address && (
              <div className="icon-prefix__container">
                <div className="icon-prefix__icon">
                  <Icon icon={faMapMarkerAlt} />
                </div>
                <div className="icon-prefix__label">
                  {address} - <a href={`https://www.google.com/maps/place/${address}`}>Directions</a>
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
          </address>
        </header>

        {purpose && <blockquote className="service__purpose">{purpose}</blockquote>}

        <footer className="service__footer">
          {classification && (
            <div className="icon-prefix__container">
              <div className="icon-prefix__icon">
                <Icon icon={faFolderOpen} />
              </div>
              <div className="icon-prefix__label">
                <a href={`https://www.familyservices.govt.nz/directory-help/classifications.html`}>{classification}</a>
              </div>
            </div>
          )}

          {hideMoreDetails || (
            <Link className="button" to={`/service/${fsdId}`}>
              More details
            </Link>
          )}
        </footer>
      </section>
    );
  }
}
