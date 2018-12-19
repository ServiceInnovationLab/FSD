import React from 'react';
import { shallow } from 'enzyme';

import Header from '../header';

describe('header.js', () => {
  it('renders without error', () => {
    shallow(<Header />);
  });

  describe('render', () => {
    const component = shallow(<Header />);

    it('contains the page header', () => {
      expect(component.find('header')).toHaveLength(1);
    });

    it('has an identifiable class name for the header', () => {
      expect(component.find('.app__header')).toHaveLength(1);
    });

    it('contains an h1 for validation', () => {
      expect(component.find('h1')).toHaveLength(1);
    });
  });
});
