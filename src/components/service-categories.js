import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MDBContainer, MDBInput, MDBBtn } from 'mdbreact';
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
                <h3>
                  <strong>Choose a category</strong>
                </h3>
              </header>
              {categories &&
                categories.map((category, index) => {
                  let classList = ['category__button'];

                  let selected = (selectedCategory !== category.name)

                  return (
                    <MDBBtn
                      onClick={e => {
                        e.preventDefault();
                        doSetCategory(category.name);
                      }}
                      color="success"
                      flat={selected}
                      key={`category_${index}`}
                    >
                      {category.name}
                    </MDBBtn>
                  );
                })}
            </section>
          );
        }}
      </CategoryContext.Consumer>
    );
  }
}
