// Wrapper around the addressfinder New Zealand address completion API
// 
// https://addressfinder.nz/
import axios from 'axios';
import queryString from 'query-string';

const ADDRESS_FINDER_KEY = process.env.REACT_APP_ADDRESS_FINDER_API_KEY

  // Get address or location suggestions as appropriate
  const getSuggestions = userInput => {
    const cleansedInput = userInput.trim().toLowerCase();
    
    // return an empty set for an empty query
    if (cleansedInput.length === 0) return []

    // return address suggestions if the query starts with a number, otherwise location suggestions
    return (cleansedInput[0] >= '0' && cleansedInput[0] <= '9')
      ? (getAddressSuggestions(cleansedInput) || getLocationSuggestions(cleansedInput))
      : (getLocationSuggestions(cleansedInput) || getAddressSuggestions(cleansedInput)) 
  };
  
  // Get suggestions from the addressfinder Locations API (locations/regions)
  const getLocationSuggestions = searchString => {
    // return an empty set for an empty query
    if (searchString.length === 0) return []

    const query = queryString.stringify({
      key: ADDRESS_FINDER_KEY,
      q: searchString, 
      format: 'json',
      strict: 2
    })

    const url = `https://api.addressfinder.io/api/nz/location?${query}`
    
    return axios.get(url)
      .then(response => {
        return response.data.completions
      });
  };
  
  // Get suggestions from the addressFinder Address API (street addresses)
  const getAddressSuggestions = searchString => {
    // return an empty set for an empty query
    if (searchString.length === 0) return []

    const query = queryString.stringify({
      key: ADDRESS_FINDER_KEY,
      q: searchString, 
      format: 'json',
      strict: 2
    })

    const url = `https://api.addressfinder.io/api/nz/address?${query}`
    
    return axios.get(url)
      .then(response => {
        return response.data.completions
      });
  };

  // Get the full record for an address specified by its primary key (pxid)
  //
  // Note that this call also works for locations in practice
  const getAddressMetadata = (pxid) => {
    const query = queryString.stringify({
      key: ADDRESS_FINDER_KEY,
      format:'json',
      pxid: pxid
    })
    
    const url = `https://api.addressfinder.io/api/nz/address/info?${query}`
  
    return axios.get(url);
  };

  // Get teh full record for a location specified by its primay key (pxid)
  const getLocationMetadata = (pxid) => {
    const query = queryString.stringify({
      key: ADDRESS_FINDER_KEY,
      format:'json',
      pxid: pxid
    })
    
    const url = `https://api.addressfinder.io/api/nz/location/info?${query}`
  
    return axios.get(url);
  };

  export { 
    getSuggestions, 
    getAddressSuggestions, 
    getAddressMetadata, 
    getLocationSuggestions, 
    getLocationMetadata 
  }