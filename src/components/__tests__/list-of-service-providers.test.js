import React from 'react';
import { shallow } from 'enzyme';

import ListOfServiceProviders from '../list-of-service-providers';

import serviceProviders from '../../__mocks__/serviceProviders';

describe('header.js', () => {
  it('renders without error', () => {
    shallow(<ListOfServiceProviders serviceProviders={serviceProviders} />);
  });

  describe('props', () => {
    describe('serviceProviders', () => {
      it('displays the providers correctly', () => {
        const component = shallow(
          <ListOfServiceProviders serviceProviders={serviceProviders} />
        );

        expect(component.find('h2')).toHaveLength(serviceProviders.length);
        expect(component).toMatchSnapshot();
      });
    });
  });
});
