import React, { Component } from 'react';
import './App.css';
import ServiceCategories from './components/ServiceCategories'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <ServiceCategories />
        </main>
      </div>
    );
  }
}

export default App;
