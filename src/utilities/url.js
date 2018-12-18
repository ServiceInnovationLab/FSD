const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
const API_PATH = process.env.REACT_APP_API_PATH;

const filters = category =>
  category ? `&filters={"LEVEL_1_CATEGORY":"${category}"}` : '';

const STATICFIELDS =
  'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1';

const requestBuilder = searchVars => {
  const { keyword, category, addressLatLng } = searchVars;
  const query = keyword && keyword.length > 2 ? `&q=${keyword}` : '';
  const categoryFilters = filters(category);
  let url = encodeURI(
    `${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}${query}&distinct=true${categoryFilters}`
  );

  if (addressLatLng.latitude) url += '&limit=5000';

  return url;
};

export { RESOURCE_ID, API_PATH, filters, STATICFIELDS, requestBuilder };
