import UserLocation from '../userLocation';

describe('UserLocation', () => {
  describe('When the parameters are valid', () => {
    it('Produces an appropriate object', () => {
      const subject = UserLocation("address", "-41.0", "174.0");

      expect(subject).not.toBeNull();
      expect(subject.address).toBe('address');
      expect(subject.lat).toBe(-41.0);
      expect(subject.lng).toBe(174.0);
    });
  });

  describe('When the address is missing', () => {
    it('Returns null', () => {
      const subject = UserLocation("", "-41.0", "174.0");
      expect(subject).toBeNull();
    });
  });

  describe('When the lat is missing', () => {
    it('Returns null', () => {
      const subject = UserLocation("address", "", null);
      expect(subject).toBeNull();
    });
  });

  describe('When the lat is not numeric', () => {
    it('Returns null', () => {
      const subject = UserLocation("address", "thelatitude", "174.0");
      expect(subject).toBeNull();
    });
  });

  describe('When the lng is missing', () => {
    it('Returns null', () => {
      const subject = UserLocation("address", "-41.0", null);
      expect(subject).toBeNull();
    });
  });

  describe('When the lng is not numeric', () => {
    it('Returns null', () => {
      const subject = UserLocation("address", "-41.0", "thelongitude");
      expect(subject).toBeNull();
    });
  });
});