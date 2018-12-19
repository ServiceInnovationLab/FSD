import React, { Fragment } from 'react';
import { shallow } from 'enzyme';

import { CategoryProvider } from '../category-context';

describe('category-context.js', () => {
  describe('CategoryProvider', () => {
    it('renders without error', () => {
      shallow(
        <CategoryProvider>
          <Fragment />
        </CategoryProvider>
      );
    });
  });
});
