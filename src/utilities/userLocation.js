// Represents a user location with an address (street address OR region) and
// latitude and longitude coordinates
//
// All values should be present in a valid model
//
// The latitude and longitude values are specifically named lat and lng to be
// compatible with the position objects used in react-leaflet to place map
// markers
class UserLocation {
  address; 
  lat; 
  lng;
  
  constructor(address, lat, lng) {
    this.address = address;
    this.lat = Number(lat);
    this.lng = Number(lng);
  }
};

export default UserLocation;