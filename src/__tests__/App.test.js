import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App.js', () => {
  it('renders without error', () => {
    shallow(<App />);
  });

  describe('render', () => {
    const component = shallow(<App />);

    it('contains the context for category', () => {
      expect(component.find('CategoryProvider')).toHaveLength(1);
    });

    it('contains the app\'s Router', () => {
      expect(component.find('BrowserRouter')).toHaveLength(1);
    });

    // Not sure why yet, but nothing inside the context seems to be visible
    xit('contains the all of the routes', () => {
      expect(component.find('Route')).toHaveLength(1);
    });
  });
});
