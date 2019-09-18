import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ServiceMapMarker extends Component {
  static propTypes = {
    FSD_ID: PropTypes.string,
    LATITUDE: PropTypes.string,
    LONGITUDE: PropTypes.string,
    PROVIDER_NAME: PropTypes.string,
    ORGANISATION_PURPOSE: PropTypes.string,
    PHYSICAL_ADDRESS: PropTypes.string
  };

  render() {
    const { record } = this.props;
    const { FSD_ID, LATITUDE, LONGITUDE, PROVIDER_NAME, ORGANISATION_PURPOSE, PHYSICAL_ADDRESS} = record;

    const position = { lat: Number(LATITUDE), lng: Number(LONGITUDE) };

    return (
      <div>
        {LATITUDE && LONGITUDE && (
          <Marker position={position}>
            <Popup>
              <span>
                <h5>
                  <Link to={{pathname: `/service/${FSD_ID}`}}>
                    {PROVIDER_NAME}
                  </Link>
                </h5>
                <p>{ORGANISATION_PURPOSE}</p>
                <p>{PHYSICAL_ADDRESS}</p>
              </span>
            </Popup>
          </Marker>
        )}
      </div>
    );
  }
};
