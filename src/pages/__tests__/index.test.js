import React from 'react';
import { shallow } from 'enzyme';

import Index from '../index';

import history from '../../__mocks__/history';
import categoryContext from '../../__mocks__/categoryContext';

describe('index.js', () => {
  it('renders without error', () => {
    shallow(<Index history={history} categoryContext={categoryContext} />);
  });

  describe('props', () => {
    it('doesn\'t raise error with required props', () => {
      expect(() => {
        shallow(<Index history={history} categoryContext={categoryContext} />);
      }).not.toThrow();
    });
  });

  describe('methods', () => {
    describe('doSetCategory', () => {
      it('fires when called', () => {
        const component = shallow(
          <Index history={history} categoryContext={categoryContext} />
        );
        const spy = jest.spyOn(component.instance(), 'doSetCategory');
        const category = 'dogs';

        expect(spy).not.toHaveBeenCalled();
        component.instance().doSetCategory(category);
        expect(spy).toHaveBeenCalledWith(category);
      });
    });

    describe('render', () => {
      const component = shallow(<Index history={history} categoryContext={categoryContext} />);

      it('contains the page header', () => {
        expect(component.find('Header')).toHaveLength(1);
      });

      it('contains a main wrapper around the page content', () => {
        expect(component.find('main[role="main"]')).toHaveLength(1);
      });

      it('contains the service categories', () => {
        expect(component.find('ServiceCategories')).toHaveLength(1);
      });

      xit('contains the list of service providers', () => {
        expect(component.find('ListOfServiceProviders')).toHaveLength(1);
      });
    });
  });
});
