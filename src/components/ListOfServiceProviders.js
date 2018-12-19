import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListOfServiceProviders extends Component {

  render() {
    const { serviceProviders } = this.props;

    return (
      <div>
        {serviceProviders.map((provider, key) => (
          <h2
            key={key}
            // onClick={() => setCategory(category.name)}
            // className={selectedCategory === category.name ? 'selected' : ''}
          >
            A service provider
          </h2>
        ))}
      </div>
    );
  }

}

ListOfServiceProviders.propTypes = {
  serviceProviders: PropTypes.object
};
