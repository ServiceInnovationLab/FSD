import React, { Component } from 'react';

const ServiceContext = React.createContext();

class ServiceProvider extends Component {
  state = {
    serviceProviders: []
  };


  render() {
    const { serviceProviders } = this.state;
    const { children } = this.props;

    return (
      <ServiceContext.Provider
        value={{
          serviceProviders,
        }}
      >
        {children}
      </ServiceContext.Provider>
    );
  }
}

export { ServiceContext, ServiceProvider };
