// Wrapper around the addressfinder New Zealand address completion API
//
// https://addressfinder.nz/
import axios from 'axios';
import queryString from 'query-string';

const ADDRESS_FINDER_BASE_URL = process.env.REACT_APP_ADDRESS_FINDER_BASE_URL;
const ADDRESS_FINDER_KEY = process.env.REACT_APP_ADDRESS_FINDER_API_KEY;

// Get address or location suggestions as appropriate
const getSuggestions = userInput => {
  const cleansedInput = userInput.trim().toLowerCase();

  // return an empty set for an empty query
  if (cleansedInput.length === 0) return [];

  // return address suggestions if the query starts with a number, otherwise location suggestions
  return cleansedInput[0] >= '0' && cleansedInput[0] <= '9'
    ? getAddressSuggestions(cleansedInput)
    : getLocationSuggestions(cleansedInput);
};

// Get suggestions from the addressfinder Locations API (locations/regions)
const getLocationSuggestions = async searchString => {
  // return an empty set for an empty query
  if (searchString.length === 0) return [];

  const queryParams = {
    q: searchString,
    strict: 2,
    region: 0,
  };

  const response = await addressFinderQuery('api/nz/location', queryParams);
  // add the property type: location to each result so we can tell what type of suggestion it is
  return response.completions.map(c => ({ ...c, type: 'location' }));
};

// Get suggestions from the addressFinder Address API (street addresses)
const getAddressSuggestions = async searchString => {
  // return an empty set for an empty query
  if (searchString.length === 0) return [];

  const queryParams = {
    q: searchString,
    strict: 2,
  };

  const response = await addressFinderQuery('api/nz/address', queryParams);
  // add the property type: address to each result so we can tell what type of suggestion it is
  return response.completions.map(c => ({ ...c, type: 'address' }));
};

// Get the full record for an address specified by its primary key (pxid)
//
// Note that this call also works for locations in practice
const getAddressMetadata = pxid => {
  const queryParams = {
    pxid: pxid,
  };

  return addressFinderQuery('api/nz/address/info', queryParams);
};

// Get the full record for a location specified by its primary key (pxid)
const getLocationMetadata = pxid => {
  const queryParams = {
    pxid: pxid,
  };

  return addressFinderQuery('api/nz/location/info', queryParams);
};

export { getSuggestions, getAddressSuggestions, getAddressMetadata, getLocationSuggestions, getLocationMetadata };

// Submits a query to an addressfinder API endpoint
//
// Applies the API key and format=json unless they are overridden in queryParams
async function addressFinderQuery(method, queryParams) {
  const combinedQueryParams = {
    key: ADDRESS_FINDER_KEY,
    format: 'json',
    ...queryParams,
  };

  const request = new URL(method, ADDRESS_FINDER_BASE_URL);
  request.search = queryString.stringify(combinedQueryParams);

  const response = await axios.get(request);
  return response.data;
}
