import { RESOURCE_ID, API_PATH, categories, STATICFIELDS, requestBuilder } from '../url';
import searchVars from '../../__mocks__/searchVars';

describe('url.js', () => {
  describe('RESOURCE_ID', () => {
    it('is defined correctly', () => {
      expect(RESOURCE_ID).toBeDefined();
      expect(RESOURCE_ID).toBe(process.env.REACT_APP_API_RESOURCE_ID);
    });
  });

  describe('API_PATH', () => {
    it('is defined correctly', () => {
      expect(API_PATH).toBeDefined();
      expect(API_PATH).toBe(process.env.REACT_APP_API_PATH);
    });
  });

  describe('categories', () => {
    it('is defined correctly', () => {
      expect(categories).toBeDefined();
      expect(() => {
        categories('');
      }).not.toThrow();
    });

    it('responds with empty string when given no param', () => {
      expect(categories()).toBe('');
    });

    it('responds with empty string when given falsey param', () => {
      expect(categories(false)).toBe('');
    });

    it('responds with category string when given a valid category', () => {
      expect(categories('dogs')).toBe('&filters={"LEVEL_1_CATEGORY":"dogs"}');
    });
  });

  describe('STATICFIELDS', () => {
    it('is defined correctly', () => {
      expect(STATICFIELDS).toBeDefined();
      expect(STATICFIELDS).toBe(
        'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1',
      );
    });
  });

  describe('requestBuilder', () => {
    let searchVarsClone = { ...searchVars };
    const categoryExamples = {
      none: null,
      valid: 'dogs',
    };
    const keywords = {
      none: null,
      tooShort: 'aa',
      valid: 'aaa',
    };
    const addressLatLngs = {
      none: {
        latitude: null,
        longitude: null,
      },
      valid: {
        latitude: 1,
        longitude: 1,
      },
    };

    it('is defined correctly', () => {
      expect(requestBuilder).toBeDefined();
      expect(() => {
        requestBuilder(searchVars);
      }).not.toThrow();
    });

    it("doesn't clarify keyword when it's null", () => {
      searchVarsClone.keyword = keywords.none;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).toBe(
        encodeURI(`${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}`),
      );
    });

    it("doesn't clarify keyword when it's less than or equal to 2 chars", () => {
      searchVarsClone.keyword = keywords.tooShort;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).toBe(
        encodeURI(`${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}`),
      );
    });

    it("clarifies keyword when it's greater than 2 chars", () => {
      searchVarsClone.keyword = keywords.valid;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).toBe(
        encodeURI(
          `${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${
            searchVarsClone.keyword
          }`,
        ),
      );
    });

    it("doesn't filter wihtout a category", () => {
      searchVarsClone.keyword = keywords.valid;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).toBe(
        encodeURI(
          `${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${
            searchVarsClone.keyword
          }`,
        ),
      );
    });

    it('filters by category', () => {
      searchVarsClone.keyword = keywords.valid;
      searchVarsClone.category = categoryExamples.valid;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).toBe(
        encodeURI(
          `${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${
            searchVarsClone.keyword
          }${categories(searchVarsClone.category)}`,
        ),
      );
    });

    it("doesn't limit when there is no address", () => {
      searchVarsClone.keyword = keywords.valid;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).toBe(
        encodeURI(
          `${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${
            searchVarsClone.keyword
          }`,
        ),
      );
    });

    it('limits when there is an address', () => {
      searchVarsClone.keyword = keywords.valid;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.valid;

      expect(requestBuilder(searchVarsClone)).toBe(
        encodeURI(
          `${API_PATH}datastore_search?distinct=true&resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${
            searchVarsClone.keyword
          }&limit=5000`,
        ),
      );
    });
  });
});
