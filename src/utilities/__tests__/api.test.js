import axios from 'axios';

import { loadCategories, loadResults, loadService } from '../api';
import { RESOURCE_ID, API_PATH, STATICFIELDS, requestBuilder } from '../url';
import searchVars from '../../__mocks__/searchVars';

describe('api.js', () => {
  describe('loadCategories', () => {
    it('is defined correctly', () => {
      expect(loadCategories).toBeDefined();
      expect(() => {
        loadCategories();
      }).not.toThrow();
    });

    describe('fetch behavior', () => {
      const sql = encodeURI(
        `SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${RESOURCE_ID}" GROUP BY name ORDER BY name`
      );
      const url = `${API_PATH}datastore_search_sql?sql=${sql}`;
      const invalidUrl = `${API_PATH}datastore_search_sql`;

      it('responds with error when given an invalid URL', () => {
        axios
          .get(invalidUrl)
          .then(response => {
            expect(response).toBeUndefined();
            done();
          })
          .catch(error => {
            expect(error).toBeDefined();
            done();
          });
      });

      it('responds with approprate data when given a valid url', () => {
        axios
          .get(url)
          .then(response => {
            expect(response).toBeDefined();
            expect(response.data).toBeDefined();
            expect(response.data.result).toBeDefined();
            expect(response.data.result.records).toBeDefined();
            done();
          })
          .catch(error => {
            expect(error).toBeUndefined();
            done();
          });
      });
    });
  });

  describe('loadResults', () => {
    it('is defined correctly', () => {
      expect(loadResults).toBeDefined();
      expect(() => {
        loadResults(searchVars);
      }).not.toThrow();
    });

    it('throws error without params', () => {
      expect(() => {
        loadResults();
      }).toThrow();
    });

    it('returns an empty array when given invalid search parameters', () => {
       let searchVarsClone = { ...searchVars };
       searchVarsClone.category = null;
       searchVarsClone.keyword = null;
       searchVarsClone.addressLatLng = null;

      expect(loadResults(searchVarsClone)).toMatchObject([]);
    });
    
    describe('fetch behavior', () => {
      const invalidUrl = encodeURI(
        `${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}`
      );

      it('responds with error when given an invalid URL', () => {
        axios
          .get(invalidUrl)
          .then(response => {
            expect(response).toBeUndefined();
            done();
          })
          .catch(error => {
            expect(error).toBeDefined();
            done();
          });
      });

      it('contains a response object when given a valid URL', () => {
        axios
          .get(requestBuilder(searchVars))
          .then(response => {
            expect(response).toBeDefined();
            done();
          })
          .catch(error => {
            expect(error).toBeUndefined();
            done();
          });
      });
    });
  });

  describe('loadService', () => {
    it('is defined correctly', () => {
      expect(loadService).toBeDefined();
      expect(() => {
        loadService(1);
      }).not.toThrow();
    });

    describe('fetch behavior', () => {
      const serviceId = 1;
      const url = encodeURI(
        `${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${serviceId}&distinct=true`
      );
      const invalidUrl = encodeURI(
        `${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${''}&distinct=true`
      );

      it('responds with error when given an invalid URL', () => {
        axios
          .get(invalidUrl)
          .then(response => {
            expect(response).toBeUndefined();
            done();
          })
          .catch(error => {
            expect(error).toBeDefined();
            done();
          });
      });

      it('responds with approprate data when given a valid url', () => {
        axios
          .get(url)
          .then(response => {
            expect(response).toBeDefined();
            expect(response.data).toBeDefined();
            expect(response.data.result).toBeDefined();
            expect(response.data.result.records).toBeDefined();
            done();
          })
          .catch(error => {
            expect(error).toBeUndefined();
            done();
          });
      });
    });
  });
});
