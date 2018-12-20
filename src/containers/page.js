import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/header';

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  render() {
    const { className, children } = this.props;

    return (
      <section className={className}>
        <Header />
        <main role="main">{children}</main>
      </section>
    );
  }
}
