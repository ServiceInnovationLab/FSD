import React, { Component } from 'react';

import { loadCategories } from '../utilities/api';

const CategoryContext = React.createContext();

class CategoryProvider extends Component {
  state = {
    categories: [],
    selectedCategory: '',
    categoriesExpanded: false,
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
      selectedCategory: categoryName,
      categoriesExpanded: false
    });
  };

  toggleCategories = () => {
    this.setState({
      categoriesExpanded: !this.state.categoriesExpanded
    });
  }

  render() {
    const { categories, selectedCategory, categoriesExpanded } = this.state;
    const { children } = this.props;

    return (
      <CategoryContext.Provider
        value={{
          categories,
          selectedCategory,
          categoriesExpanded,
          setCategory: this.setCategory,
          toggleCategories: this.toggleCategories,
        }}
      >
        {children}
      </CategoryContext.Provider>
    );
  }
}

export { CategoryContext, CategoryProvider };
