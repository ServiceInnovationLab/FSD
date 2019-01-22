import axios from 'axios';

import { findNearMe } from './geography';
import { RESOURCE_ID, API_PATH, requestBuilder, SERVICE_FIELDS } from './url';


const loadCategories = () => {
  const sql = encodeURI(
    `SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${RESOURCE_ID}" GROUP BY name ORDER BY name`
  );
  const url = `${API_PATH}datastore_search_sql?sql=${sql}`;

  return axios
    .get(url)
    .then(response => {
      return response.data.result.records;
    })
    .catch(error => {
      console.error(error)
      return []
    });
};

const loadResults = searchVars => {
  const { latitude, longitude, category, keyword, radius = 50000 } = searchVars;

  if (!category && !keyword && (!latitude || !longitude)) {
    return []
  } else {
    return axios
      .get(requestBuilder(searchVars))
      .then(response => {
        if (latitude !== undefined) {
          return findNearMe(
            response.data.result.records,
            {latitude, longitude},
            radius > 50000 ? 100000 : radius
          );
        } else {
          return response.data.result.records;
        }
      })
      .catch(error => {
        console.error(error)
        return [];
      });
  }
};

const loadService = serviceId => {
  const url = encodeURI(
    `${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${SERVICE_FIELDS}&q=${serviceId}&distinct=true`
  );

  return axios
    .get(url)
    .then(response => {
      return response.data.result.records;
    })
    .catch(error => {
      console.error(error)
      return [];
    });
};

export { loadCategories, loadResults, loadService };
