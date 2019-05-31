import React from 'react';
import { MDBJumbotron } from 'mdbreact';

const Header = () => {
  return (
    <header className="app__header">
      <div className="container">
        <MDBJumbotron>
          <h2 className="h1 display-5">
            <strong>Find Whānau Support</strong>
          </h2>
          <p className="text-muted">Mobile Site</p>
          <p className="lead">
            If you are using a mobile device and are looking for family support services near you then you can use Find
            Whānau Support, the mobile responsive site for the Ministry of Social Development’s Family Services
            Directory.
          </p>
          <small className="text-muted">
            If you are a provider or want to use the enhanced functions then please visit{' '}

            <a href="https://www.familyservices.govt.nz/directory">Family Services Directory</a>.
          </small>
        </MDBJumbotron>
      </div>
    </header>
  );
};

export default Header;
