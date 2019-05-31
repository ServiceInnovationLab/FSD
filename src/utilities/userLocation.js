// Represents a user location with an address (street address OR region) and
// latitude and longitude coordinates
//
// If all values are valid, and object is returned. If any are invalid or
// missing null is returned.
//
// The latitude and longitude values are specifically named lat and lng to be
// compatible with the position objects used in react-leaflet to place map
// markers
const UserLocation = (address, lat, lng) => {
  const result = { address, lat: Number(lat), lng: Number(lng) };

  if (result.address && result.lat && result.lng) {
    return result;
  }

  return null;
};

export default UserLocation;