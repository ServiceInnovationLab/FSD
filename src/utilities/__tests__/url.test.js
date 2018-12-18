import {
  RESOURCE_ID,
  API_PATH,
  filters,
  STATICFIELDS,
  requestBuilder
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

  describe('filters', () => {
    it('is defined correctly', () => {
      expect(filters).toBeDefined();
      expect(() => {
        filters('');
      }).not.toThrow();
    });
  });

  describe('STATICFIELDS', () => {
    it('is defined correctly', () => {
      expect(STATICFIELDS).toBeDefined();
      expect(STATICFIELDS).toBe(
        'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1'
      );
    });
  });

  describe('requestBuilder', () => {
    it('is defined correctly', () => {
      expect(requestBuilder).toBeDefined();
      expect(() => {
        requestBuilder(searchVars);
      }).not.toThrow();
    });
  });
});
