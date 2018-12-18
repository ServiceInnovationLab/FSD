import { loadFilters, loadResults, loadService } from '../api';
import searchVars from '../../__mocks__/searchVars';

describe('api.js', () => {
  describe('loadFilters', () => {
    it('is defined correctly', () => {
      expect(loadFilters).toBeDefined();
      expect(() => {
        loadFilters();
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
