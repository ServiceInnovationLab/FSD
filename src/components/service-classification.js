import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

export default class ServiceClassification extends Component {
  static propTypes = {
    classification: PropTypes.string,
  };

  render() {
    const { classification } = this.props;

    return (
      <div className="icon-prefix__container">
        <div className="icon-prefix__icon">
          <Icon icon={faFolderOpen} />
        </div>
        <div className="icon-prefix__label">
          <a href={`https://www.familyservices.govt.nz/directory-help/classifications.html`}>
            {classification && classification.split(',').join(', ')}
          </a>
        </div>
      </div>
    );
  }
}
