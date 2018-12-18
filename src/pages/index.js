import React, { Component } from 'react';
import ServiceCategories from './components/ServiceCategories';
import Header from './components/Header';

export default class Index extends Component {
  render() {
    return (
      <section>
        <header>
          <Header />
        </header>
        <main role="main">
          <ServiceCategories />
        </main>
      </section>
    );
  }
}
