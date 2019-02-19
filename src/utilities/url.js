const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
const API_PATH = process.env.REACT_APP_API_PATH;
const GH_PAGES_SUFFIX = process.env.REACT_APP_GH_PAGES_SUFFIX;

const categories = category => (category ? `&filters={"LEVEL_1_CATEGORY":"${category}"}` : '');

const STATICFIELDS =
  'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1';

const SERVICE_FIELDS =
  'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1,LEVEL_1_CATEGORY,SERVICE_NAME,SERVICE_TARGET_AUDIENCES,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,COST_DESCRIPTION,SERVICE_REFERRALS';

// Constructs a request URL
//
// Uses a looser match on other search vars if no keywords are present
const requestBuilder = searchVars => {
  const { keyword } = searchVars;

  return keywordIsValid(keyword)
    ? keywordRequest(searchVars)
    : rankedRequest(searchVars)
};

// Get the number of results available for a query. 
//
// This will actually perform the query on the remote server but only ask for
// the result count. Useful for getting the last page of results by setting
// limit and offset in a subsequent query while reducing the amount of data
// transferred.
const requestResultCount = searchVars => requestBuilder({...searchVars, limit: 0});

// false if not enough information is present to make a meaningful search
const isValidQuery = searchVars => {
  const { keyword, category, address, region, latitude, longitude } = searchVars;

  return Boolean(
    category 
    || keywordIsValid(keyword)
    || (latitude && longitude) 
    || address 
    || region);
};

const keywordIsValid = keyword => {
  return keyword && keyword.length > 2;
}

export { RESOURCE_ID, API_PATH, categories, STATICFIELDS, requestBuilder, requestResultCount, isValidQuery, SERVICE_FIELDS, GH_PAGES_SUFFIX };

// Make a request which must include all keywords and will score better if it matches other terms
const keywordRequest = searchVars => {
  const { keyword, category, address, region, offset = 0, limit = 10 } = searchVars;
  const categoryFilters = categories(category);

  // require all terms from the keyword field by joining them with the AND operator
  const keywordQuery = tokenize(keyword).join(' & ');

  // allow a rank boost for terms in other fields by joining them with the OR operator
  const additionalTerms = [category, address, region].join(' ')
  const additionalQuery = tokenize(additionalTerms).join(' | ');

  const query = additionalQuery 
    ? `(${keywordQuery}) & (${additionalQuery})`
    : keywordQuery;

  return `${API_PATH}datastore_search?distinct=true&plain=false&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${encodeURIComponent(query)}${categoryFilters}&offset=${Math.max(0, offset)}&limit=${limit}`;
};

// Make a request and rank results on similarity to any search terms
const rankedRequest = searchVars => {
  const { keyword, category, address, region, offset = 0, limit = 10 } = searchVars;

  // smoosh all the terms together with OR operators. More relevant results will have higher rank
  const terms = [keyword, category, address, region].join(' ');
  const query = tokenize(terms).join(' | ');
  const categoryFilters = categories(category);

  // note plain=false to enable the advanced query mode, otherwise all terms will be ANDed together not ORed
  return `${API_PATH}datastore_search?distinct=true&plain=false&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${encodeURIComponent(query)}${categoryFilters}&offset=${Math.max(0, offset)}&limit=${limit}`;
};

// Break a string into tokens (words)
const tokenize = terms => {
  return terms.match(/([\w']+)/g) || [];
}