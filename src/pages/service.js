import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Page from '../containers/page';

export default class Service extends Component {
  render() {
    return (
      <Page>
        <header>
          <Link to="/">Go back</Link>
        </header>
      </Page>
    );
  }
}
