import React, { Component } from 'react';
import './App.css';
import ServiceCategories from './components/ServiceCategories';
import Header from './components/Header';

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
