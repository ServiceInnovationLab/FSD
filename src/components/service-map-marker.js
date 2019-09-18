import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

const ServiceMapMarker = props => {
  const { record } = props;
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
};

export default ServiceMapMarker;
