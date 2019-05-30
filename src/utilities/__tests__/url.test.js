import {
  RESOURCE_ID,
  API_PATH,
  categories,
  STATICFIELDS,
  requestBuilder,
  isValidQuery,
} from '../url';
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

    it('is not valid when the keyword length is <= 2 chars and there are no other search terms', () => {
      searchVarsClone.keyword = keywords.tooShort;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(isValidQuery(searchVarsClone)).toBe(false);
    });

    it("clarifies keyword when it's greater than 2 chars", () => {
      searchVarsClone.keyword = keywords.valid;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).toContain(
        `q=${searchVarsClone.keyword}`,
      );
    });

    it("doesn't filter without a category", () => {
      searchVarsClone.keyword = keywords.valid;
      searchVarsClone.category = categoryExamples.none;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).not.toContain(
        'filters={"LEVEL_1_CATEGORY":',
      );
    });

    it('filters by category', () => {
      searchVarsClone.keyword = keywords.valid;
      searchVarsClone.category = categoryExamples.valid;
      searchVarsClone.addressLatLng = addressLatLngs.none;

      expect(requestBuilder(searchVarsClone)).toContain(
        categories(searchVarsClone.category),
      );
    });
  });
});
