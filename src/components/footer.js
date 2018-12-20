import React, { Component } from 'react';

import footerLogo from '../assets/img/footer-logo-govt.png';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app__footer">
        <div className="container">
          <p>
            Data sourced from <a href="https://data.govt.nz">data.govt.nz</a>
          </p>
          <p>
            Another alpha from the{' '}
            <a href="https://webtoolkit.govt.nz/blog/tag/service-innovation-lab/">
              Service Innovation Lab
            </a>
          </p>

          <p>
            Please find the full directory or add your services at{' '}
            <a href="//familyservices.govt.nz/directory">
              familyservices.govt.nz/directory
            </a>
          </p>
          <div>
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
        </div>
      </footer>
    );
  }
}
