import React, { Component } from 'react';

import ServiceCategories from '../components/ServiceCategories';
import ListOfServiceProviders from '../components/ServiceCategories';
import Header from '../components/Header';

import { loadCategories } from '../utilities/api';

export default class Index extends Component {
  state = {
    categories: [],
    selectedCategory: '',
    serviceProviders: []
  };

  componentDidMount = () => {
    this.doLoadCategories();
  };

  setCategory = (categoryName) => {
    const { push, location } = this.props.history
    push(`${location.pathname}?category=${categoryName}`)
    this.setState({selectedCategory: categoryName})
  }

  doLoadCategories = () => {
    loadCategories().then(categories => {
      this.setState({ categories });
    });
  };

  render() {
    const { categories, selectedCategory, serviceProviders } = this.state;
    return (
      <section>
        <Header />
        <main role="main">
          <ServiceCategories
            categories={categories}
            selectedCategory={selectedCategory}
            setCategory={this.setCategory}
          />
          <ListOfServiceProviders
            serviceProviders={serviceProviders}
          />
        </main>
      </section>
    );
  }
}
