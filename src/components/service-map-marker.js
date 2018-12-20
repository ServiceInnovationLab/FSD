import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const ServiceMapMarker = ( props ) => {
  const { record } = props
  const {
    LATITUDE,
    LONGITUDE,
    PROVIDER_NAME,
    SERVICE_NAME,
    ORGANISATION_PURPOSE,
    PHYSICAL_ADDRESS
  } = record

  let position = {lat: Number(LATITUDE), lng: Number(LONGITUDE)};

  return (
    <div>
      {LATITUDE && LONGITUDE &&
        <Marker position={position}>
          <Popup>
            <span>
              <h5>{PROVIDER_NAME}</h5>
              <h6>{SERVICE_NAME}</h6>
              <p>{ORGANISATION_PURPOSE}</p>
              <p>{PHYSICAL_ADDRESS}</p>
            </span>
          </Popup>
        </Marker>
      }
    </div>
  );
};

export default ServiceMapMarker;
