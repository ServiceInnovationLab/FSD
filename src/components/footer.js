import React, { Component } from 'react';

import footerLogo from '../assets/img/footer-logo-govt.png';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app__footer">
        <div className="container">
          <div className="footer-logo">
            <a
              href="https://www.govt.nz"
              className="ga-track-logo-footer-aog footer-hm-link"
            >
              <img
                className="footer__logo"
                src={footerLogo}
                alt="New Zealand Government"
              />
            </a>
          </div>
          <p>
            <a href="https://www.digital.govt.nz/blog/labplus-reusable-component-family-services-directory/">
              About this site
            </a>{' '}
            |{' '}
            <a href="mailto:updates@familyservices.govt.nz?subject=Feedback%20on%20Mobile%20Site">
              Send us your feedback
            </a>{' '}
            |{' '}
            <a href="https://www.familyservices.govt.nz/directory/providerapplication.htm">
              Apply to list on the Family Services Directory
            </a>{' '}
            | Data sourced from <a href="https://data.govt.nz">data.govt.nz</a>
          </p>
          <p>
            Another alpha from the{' '}
            <a href="https://webtoolkit.govt.nz/blog/tag/service-innovation-lab/">
              Service Innovation Lab
            </a>
          </p>
        </div>
      </footer>
    );
  }
}
