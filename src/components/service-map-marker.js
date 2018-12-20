import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const ServiceMapMarker = ( props ) => {
  let position = {lat: props.record.LATITUDE*1, lng: props.record.LONGITUDE*1};
  return (
    <div>
      {props.record.LATITUDE && props.record.LONGITUDE &&
        <Marker position={position}>
          <Popup>
            <span>
              <h5>{props.record.PROVIDER_NAME}</h5>
              <h6>{props.record.SERVICE_NAME}</h6>
              <p>{props.record.ORGANISATION_PURPOSE}</p>
              <p>{props.record.PHYSICAL_ADDRESS}</p>
            </span>
          </Popup>
        </Marker>
      }
    </div>
  );
};

export default ServiceMapMarker;
