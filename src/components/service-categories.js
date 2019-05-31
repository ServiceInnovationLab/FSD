import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CategoryContext } from '../contexts/category-context';

export default class ServiceCategories extends Component {
  static propTypes = {
    doSetCategory: PropTypes.func.isRequired,
  };

  render() {
    const { doSetCategory } = this.props;

    return (
      <CategoryContext.Consumer>
        {categoryContext => {
          const { categories, selectedCategory } = categoryContext;
          return (
            <section className="category__container">
              <header className="category__header">
                <h3>Choose a category:</h3>
              </header>

              {categories &&
                categories.map((category, index) => {
                  let classList = ['category__button'];

                  if (selectedCategory === category.name) classList.push('selected');

                  return (
                    <button
                      onClick={e => {
                        e.preventDefault();
                        doSetCategory(category.name);
                      }}
                      className={classList.join(' ')}
                      key={`category_${index}`}
                    >
                      {category.name}
                    </button>
                  );
                })}
            </section>
          );
        }}
      </CategoryContext.Consumer>
    );
  }
}
