const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
const API_PATH = process.env.REACT_APP_API_PATH;
const GH_PAGES_SUFFIX = process.env.REACT_APP_GH_PAGES_SUFFIX;

const categories = category => (category ? `&filters={"LEVEL_1_CATEGORY":"${category}"}` : '');

const STATICFIELDS =
  'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1';

const SERVICE_FIELDS =
  'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1,LEVEL_1_CATEGORY,SERVICE_NAME,SERVICE_TARGET_AUDIENCES,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,COST_DESCRIPTION,SERVICE_REFERRALS';

const requestBuilder = searchVars => {
  const { keyword, category, address, region } = searchVars;
  const query = keyword && keyword.length > 2 
    ? keyword
    : [category, address, region].join(' ');
  const categoryFilters = categories(category);

  return `${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${encodeURIComponent(query)}${categoryFilters}`;
};

export { RESOURCE_ID, API_PATH, categories, STATICFIELDS, requestBuilder, SERVICE_FIELDS, GH_PAGES_SUFFIX };
