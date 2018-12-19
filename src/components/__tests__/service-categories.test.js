import React from 'react';
import { shallow } from 'enzyme';

import ServiceCategories from '../service-categories';

describe('index.js', () => {
  it('renders without error', () => {
    shallow(<ServiceCategories doSetCategory={jest.fn()} />);
  });

  describe('props', () => {
    it('doesn\'t raise error with required props', () => {
      expect(() => {
        shallow(<ServiceCategories doSetCategory={jest.fn()} />);
      }).not.toThrow();
    });
  });
});
