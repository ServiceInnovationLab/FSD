import { findNearMe, checkLatLng, sortByDistance } from '../geography';
import data from '../../__mocks__/data';
import dataPoint from '../../__mocks__/dataPoint';
import addressLatLng from '../../__mocks__/addressLatLng';
import { getDistance } from 'geolib';

describe('geography.js', () => {
  describe('findNearMe', () => {
    let addressLatLngClone = { ...addressLatLng };
    let dataPointClone = { ...dataPoint };
    let radius = 140000;

    it('is defined correctly', () => {
      expect(findNearMe).toBeDefined();
      expect(() => {
        findNearMe(data, addressLatLng, 10);
      }).not.toThrow();
    });

    it('throws error when not given params', () => {
      expect(() => {
        findNearMe();
      }).toThrow();
    });

    it('responds with points that are within the radius', () => {
      dataPointClone.LATITUDE = addressLatLngClone.latitude + 1.0;
      dataPointClone.LONGITUDE = addressLatLngClone.longitude + 1.0;
      dataPointClone.DISTANCE = getDistance(
        {
          latitude: addressLatLngClone.latitude,
          longitude: addressLatLngClone.longitude,
        },
        {
          latitude: dataPointClone.LATITUDE,
          longitude: dataPointClone.LONGITUDE,
        },
      );

      expect(findNearMe([dataPointClone], addressLatLng, radius)).toMatchObject(
        [dataPointClone],
      );
    });

    it("doesn't respond with points that are outside the radius", () => {
      dataPointClone.LATITUDE = addressLatLngClone.latitude + 2.0;
      dataPointClone.LONGITUDE = addressLatLngClone.longitude + 2.0;
      dataPointClone.DISTANCE = getDistance(
        {
          latitude: addressLatLngClone.latitude,
          longitude: addressLatLngClone.longitude,
        },
        {
          latitude: dataPointClone.LATITUDE,
          longitude: dataPointClone.LONGITUDE,
        },
      );

      expect(findNearMe([dataPointClone], addressLatLng, radius)).toMatchObject(
        [],
      );
    });
  });

  describe('checkLatLng', () => {
    let dataPointClone = { ...dataPoint };

    it('is defined correctly', () => {
      expect(checkLatLng).toBeDefined();
      expect(() => {
        checkLatLng(data);
      }).not.toThrow();
    });

    it('responds with data when data point qualifies', () => {
      expect(checkLatLng([dataPointClone])).toMatchObject([dataPointClone]);
    });

    it("responds null when physical address doesn't qualify", () => {
      dataPointClone.PHYSICAL_ADDRESS = '';

      expect(checkLatLng([dataPointClone])).toMatchObject([]);
    });

    it("responds null when latitude doesn't qualify", () => {
      dataPointClone.LATITUDE = null;
      expect(checkLatLng([dataPointClone])).toMatchObject([]);
      dataPointClone.LATITUDE = '0';
      expect(checkLatLng([dataPointClone])).toMatchObject([]);
    });

    it("responds null when longitude doesn't qualify", () => {
      dataPointClone.LONGITUDE = null;
      expect(checkLatLng([dataPointClone])).toMatchObject([]);
      dataPointClone.LONGITUDE = '0';
      expect(checkLatLng([dataPointClone])).toMatchObject([]);
    });
  });

  describe('sortByDistance', () => {
    let dataPointCloneA = { ...dataPoint };
    let dataPointCloneB = { ...dataPoint };

    it('is defined correctly', () => {
      expect(sortByDistance).toBeDefined();
      expect(() => {
        sortByDistance(data);
      }).not.toThrow();
    });

    it('returns original array when only one point is given', () => {
      expect(sortByDistance([dataPointCloneA])).toMatchObject([
        dataPointCloneA,
      ]);
    });

    it('maintains sort order when given in correct order', () => {
      dataPointCloneA.DISTANCE = 1;
      dataPointCloneB.DISTANCE = 2;
      const dataClone = [dataPointCloneA, dataPointCloneB];
      const results = sortByDistance(dataClone);

      for (let result = 0, l = results.length; result < l; result++) {
        expect(results[result]).toMatchObject(dataClone[result]);
      }
    });

    it('updates sort order when given in incorrect order', () => {
      dataPointCloneA.DISTANCE = 2;
      dataPointCloneB.DISTANCE = 1;
      const dataClone = [dataPointCloneA, dataPointCloneB];
      const results = sortByDistance(dataClone);

      expect(results[0]).toMatchObject(dataPointCloneB);
      expect(results[1]).toMatchObject(dataPointCloneA);
    });
  });
});
