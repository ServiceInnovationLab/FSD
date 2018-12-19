import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class MapContainer extends React.Component {

  state = {
    position: [51.505, -0.09],
    zoom: 13
  };

  render() {
    return (
      <Map center={this.state.position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={this.state.position}>
          <Popup>
            Popup for the map
          </Popup>
        </Marker>
      </Map>
    )
  }
}
