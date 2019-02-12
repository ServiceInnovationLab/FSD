import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  };

  render() {
    const { children } = this.props;

    return <section className="search__container">{children}</section>;
  }
}
