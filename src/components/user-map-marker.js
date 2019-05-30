import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const UserMapMarker = props => {
  const { 
    geoCoordinates, 
    address = 'Origin'
  } = props;

  const homeIcon = new L.Icon({
    iconUrl: require('../assets/img/user-marker-icon.png'),
    iconRetinaUrl: require('../assets/img/user-marker-icon-2x.png'),
    iconAnchor: [12, 41],
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    shadowUrl: "marker-shadow.png",
    shadowSize: [41, 41]
  });

  return (
    <div>
      <Marker 
        position={geoCoordinates}
        icon={homeIcon}
      >
        <Popup>
          <span>
            <p>{address}</p>
          </span>
        </Popup>
      </Marker>
    </div>
  );
};

export default UserMapMarker;
