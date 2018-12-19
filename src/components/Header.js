import React from 'react';

const Header = () => {
  return (
    <header className='app__header'>
      <h1>Find Whānau Support - Mobile Site</h1>
      <div>
        <p>
          If you are using a mobile device and are looking for family support
          services near you then you can use Find Whānau Support, the mobile
          responsive site for the Ministry of Social Development’s Family
          Services Directory.
        </p>
        <p>
          If you are a provider or want to use the enhanced functions then
          please visit{' '}
          <a href="https://www.familyservices.govt.nz/directory">
            Family Services Directory
          </a>.
        </p>
      </div>
    </header>
  );
};

export default Header;
