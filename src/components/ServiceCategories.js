import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ServiceCategories extends Component {

  render() {
    const { categories, selectedCategory, setCategory } = this.props;

    return (
      <div>
        {categories.map((category, key) => (
          <button
            onClick={() => setCategory(category.name)}
            className={selectedCategory === category.name ? 'selected' : ''}
            key={key}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  }

}

ServiceCategories.propTypes = {
  categories: PropTypes.array,
  setCategory: PropTypes.func,
  selectedCategory: PropTypes.string
};
