import {
  findNearMe, checkLatLng, sortByDistance
} from '../geography';
import data from '../../__mocks__/data';
import addressLatLng from '../../__mocks__/addressLatLng';

describe('geography.js', () => {
  describe('findNearMe', () => {
    it('is defined correctly', () => {
      expect(findNearMe).toBeDefined();
      expect(() => {
        findNearMe(data, addressLatLng, 10);
      }).not.toThrow();
    });
  });

  describe('checkLatLng', () => {
    it('is defined correctly', () => {
      expect(checkLatLng).toBeDefined();
      expect(() => {
        checkLatLng(data);
      }).not.toThrow();
    });
  });

  describe('sortByDistance', () => {
    it('is defined correctly', () => {
      expect(sortByDistance).toBeDefined();
      expect(() => {
        sortByDistance(data);
      }).not.toThrow();
    });
  });
});
