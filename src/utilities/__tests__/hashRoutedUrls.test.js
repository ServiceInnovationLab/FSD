import { 
  getRelativePath, 
  getSearchParams, 
  getFragment,
} from '../hashRoutedUrls'

describe('parseHashRouterUrl.js', () => {
  describe ('when the URL has no fragment at all', () => {
    let url = 'http://mydomain.com/basepath/';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('');
    });

    it('getSearchParams responds correctly', () => {
      expect(getSearchParams(url))
        .toMatchObject({});
    });
    
    it('getFragment responds correctly', () => {
      expect(getFragment(url))
        .toBe('');
    });
  });

  describe('when the URL has a relative path only', () => {
    let url = 'http://mydomain.com/basepath/#/relative/path';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/relative/path');
    });

    it('getSearchParams responds correctly', () => {
      expect(getSearchParams(url))
        .toMatchObject({});
    });
    
    it('getFragment responds correctly', () => {
      expect(getFragment(url))
        .toBe('');
    });
  });

  describe('when the URL has a relative path with no leading slash', () => {
    let url = 'http://mydomain.com/basepath/#relative/path';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('relative/path');
    });

    it('getSearchParams responds correctly', () => {
      expect(getSearchParams(url))
        .toMatchObject({});
    });
    
    it('getFragment responds correctly', () => {
      expect(getFragment(url))
        .toBe('');
    });
  });

  describe('when the URL has search params only', () => {
    let url = 'http://mydomain.com/basepath/#/?size=medium&color=red';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/');
    });

    it('getSearchParams responds correctly', () => {
      expect(getSearchParams(url))
        .toMatchObject({
          size: 'medium', 
          color: 'red'}
        );
    });
  });

  describe('when the URL has and additional fragment only', () => {
    let url = 'http://mydomain.com/basepath/#/#top';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/');
    });

    it('getSearchParams responds correctly', () => {
      expect(getSearchParams(url))
        .toMatchObject({});
    });
  });

  describe('when the URL has a relative path and search params', () =>{
    let url = 'http://mydomain.com/basepath/#/relative/path?size=medium&color=red';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/relative/path');
    });

    it('getSearchParams responds correctly', () => {
      expect(getSearchParams(url))
        .toMatchObject({
          size: 'medium', 
          color: 'red'}
        );
    });
  });

  describe('when the URL has a relative path, search params, and an additional fragment', () =>{
    let url = 'http://mydomain.com/basepath/#/relative/path?size=medium&color=red#top';

    it('getRelativePath responds correctly', () => {
      expect(getRelativePath(url))
        .toBe('/relative/path');
    });

    it('getSearchParams responds correctly', () => {
      expect(getSearchParams(url))
        .toMatchObject({
          size: 'medium', 
          color: 'red'}
        );
    });
  });
});
