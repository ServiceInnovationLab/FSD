import axios from 'axios';

import { findNearMe } from './geography';
import {
  RESOURCE_ID,
  API_PATH,
  requestBuilder,
  SERVICE_FIELDS,
  isValidQuery,
  requestResultCount,
} from './url';

const loadCategories = () => {
  const sql = encodeURI(
    `SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${RESOURCE_ID}" GROUP BY name ORDER BY name`
  );
  const url = `${API_PATH}datastore_search_sql?sql=${sql}`;

  return axios
    .get(url)
    .then(response => {
      const { records } = response.data.result;
      return records.filter(record => record.name);
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

const loadResults = async searchVars => {
  const { latitude, longitude, radius = '25', limit = 500 } = searchVars;

  // return an empty list if the query isn't valid
  if (!isValidQuery(searchVars)) return [];

  const offset = await determineLastPageOffset({ ...searchVars, limit });

  const response = await axios
    .get(requestBuilder({ ...searchVars, offset: offset, limit: limit }))
    .catch(error => {
      console.error(error);
      return [];
    });

  if (latitude && longitude) {
    const radiusInMetres = Number(radius) * 1000;
    // The results will be returned in distance order
    return findNearMe(
      response.data.result.records,
      { latitude, longitude },
      radiusInMetres
    );
  }

  // The results will be returned in rank descending order - the
  // server supplies them in rank ascendig order by default.
  return response.data.result.records.sort(x => -x.rank);
};

const loadService = serviceId => {
  const url = encodeURI(
    `${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${SERVICE_FIELDS}&q=${serviceId}&distinct=true`
  );

  return axios
    .get(url)
    .then(response => {
      const filteredResults = selectAppropriateResults(
        serviceId,
        response.data.result.records
      );

      // Because the API returns a list of records which look like a SQL join
      // between one provider and many services, we can return the first result
      // to be the provider object and all results to be the services objects,
      // and the caller can ignore the additional properties on each object
      return {
        provider: filteredResults[0],
        services: filteredResults,
      };
    })
    .catch(error => {
      console.error(error);
      return { provider: {}, services: [] };
    });
};

export { loadCategories, loadResults, loadService };

// The API can return a list of results, including a duplicate for each
// type of service offered by the organisation or even other organisations
// which are (somehow) related.
//
// The provider object from the API has properties including fsdId, FSDID
// and FSD_ID. In the examples I've seen the fsdId and FSDID can apply to
// multiple providers, but the FSD_ID specifies the provider we were
// expecting. Also the FSD_ID is the first field returned in the server
// response which implies it's the primary key.
const selectAppropriateResults = (id, providers) => {
  return providers.filter(p => p.FSD_ID === Number(id));
};

// Determine what the offset should be for the last page of search results
//
// Queries the server with limit=0 to get the count of results.
const determineLastPageOffset = async searchVars => {
  const { limit = 0 } = searchVars;

  const resultCountResponse = await axios
    .get(requestResultCount({ ...searchVars, limit: 0 }))
    .catch(error => {
      console.error(error);
      return 0;
    });

  const resultCount = resultCountResponse.data.result.total;
  return resultCount - limit;
};
