import React, { Component } from 'react';

import { loadCategories } from '../utilities/api';

const CategoryContext = React.createContext();

class CategoryProvider extends Component {
  state = {
    categories: [],
    selectedCategory: ''
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
