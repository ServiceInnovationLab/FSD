import React, { Component } from 'react';
import ServiceMapMarker from '../components/service-map-marker';
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';

export default class MapContainer extends Component {
  static propTypes = {
    serviceProviders: PropTypes.array.isRequired
  };

  render() {
    const { serviceProviders } = this.props;

    // roughly the centre of aotearoa
    const center =
      serviceProviders.length !== 1
        ? { lat: -41.0, lng: 174.0 }
        : {
          lat: Number(serviceProviders[0].LATITUDE),
          lng: Number(serviceProviders[0].LONGITUDE)
        };

    return (
      <Map center={center} zoom={serviceProviders.length !== 1 ? 5 : 12}>
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceProviders.map((record, i) => (
          <ServiceMapMarker key={`marker-${i}`} record={record} />
        ))};
      </Map>
    );
  }
}
