import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


class UserMapMarker extends Component {
  static propTypes = {
    userLocation: PropTypes.object.isRequired
  }

  static homeIcon = new L.Icon({
    iconUrl: require('../assets/img/user-marker-icon.png'),
    iconRetinaUrl: require('../assets/img/user-marker-icon-2x.png'),
    iconAnchor: [12, 41],
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'marker-shadow.png',
    shadowSize: [41, 41]
  });

  render() {
    const { userLocation } = this.props;

    return (
      <Marker 
        position={userLocation}
        icon={UserMapMarker.homeIcon}
      >
        <Popup>
          <span>
            <p>{userLocation.address}</p>
          </span>
        </Popup>
      </Marker>
    );
  }
};

export default UserMapMarker;
