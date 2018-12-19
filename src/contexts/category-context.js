import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { loadCategories } from '../utilities/api';

const CategoryContext = React.createContext();

class CategoryProvider extends Component {
  state = {
    categories: [],
    selectedCategory: ''
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  };

  componentDidMount = () => {
    this.doLoadCategories();
  };

  doLoadCategories = () => {
    loadCategories().then(categories => {
      this.setState({ categories });
    });
  };

  setCategory = categoryName => {
    this.setState({
      selectedCategory: categoryName
    });
  };

  render() {
    const { categories, selectedCategory } = this.state;
    const { children } = this.props;

    return (
      <CategoryContext.Provider
        value={{
          categories,
          selectedCategory,
          setCategory: this.setCategory
        }}
      >
        {children}
      </CategoryContext.Provider>
    );
  }
}

export { CategoryContext, CategoryProvider };
