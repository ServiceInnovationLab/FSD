import React, { Component } from 'react';
import './App.css';
import ServiceCategories from './components/service-categories';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <ServiceCategories />
        </main>
      </div>
    );
  }
}

export default App;
