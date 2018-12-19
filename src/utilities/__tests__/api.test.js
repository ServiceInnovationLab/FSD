import { loadCategories, loadResults, loadService } from '../api';
import searchVars from '../../__mocks__/searchVars';

describe('api.js', () => {
  describe('loadCategories', () => {
    it('is defined correctly', () => {
      expect(loadCategories).toBeDefined();
      expect(() => {
        loadCategories();
      }).not.toThrow();
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
  });

  describe('loadService', () => {
    it('is defined correctly', () => {
      expect(loadService).toBeDefined();
      expect(() => {
        loadService(1);
      }).not.toThrow();
    });
  });
});
