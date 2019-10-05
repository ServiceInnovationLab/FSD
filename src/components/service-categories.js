import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
          const { categories, selectedCategory, categoriesExpanded, toggleCategories } = categoryContext;
          return (
            <section className="category__container">
              <label className="small-label">Service category</label>
              <div>
                <ExpansionPanel
                  expanded={categoriesExpanded}
                  onClick={toggleCategories}
                  className="category-expansion-panel"
                  elevation={0}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={selectedCategory ? 'category__selected' : 'text-grey'}>
                      {selectedCategory && !categoriesExpanded ? selectedCategory : 'Select a category'}
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="category__list">
                      {categories &&
                        categories.map((category, index) => {
                          let classList = ['category__button'];
                          if (selectedCategory === category.name) classList.push('selected');
                          return (
                            <div className="category__item" key={'category-' + index}>
                              <ButtonBase
                                className={classList.join(' ')}
                                onClick={e => {
                                  e.preventDefault();
                                  doSetCategory(category.name);
                                }}
                              >
                                {category.name}
                              </ButtonBase>
                            </div>
                          );
                        })}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </section>
          );
        }}
      </CategoryContext.Consumer>
    );
  }
}
