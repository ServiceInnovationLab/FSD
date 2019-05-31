import React, { Component } from 'react';
import ServiceMapMarker from '../components/service-map-marker';
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import UserMapMarker from '../components/user-map-marker';

export default class MapContainer extends Component {

  static propTypes = {
    serviceProviders: PropTypes.array.isRequired,
    userLocation: PropTypes.object
  };

  render() {
    const { 
      serviceProviders,
      userLocation
    } = this.props;

    // roughly the centre of aotearoa
    const defaultMapFocus = { lat: -41.0, lng: 174.0 }
    const userCoordinates = userLocation && { lat: Number(userLocation.lat), lng: Number(userLocation.lng) }

    const center =
      serviceProviders.length === 1 
        ? {
            lat: Number(serviceProviders[0].LATITUDE),
            lng: Number(serviceProviders[0].LONGITUDE),
          }
        : userCoordinates || defaultMapFocus

    return (
      <Map center={center} zoom={serviceProviders.length !== 1 ? 5 : 12}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceProviders.map((record, i) => (
          <ServiceMapMarker key={record.FSD_ID} record={record} />
        ))}
        <UserMapMarker userLocation={userLocation} />
      </Map>
    );
  }
}
