import React from 'react';
import { stringify } from 'querystring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';

class Sharebar extends React.Component {
  render() {
    const {
      url = window.location.href,
      subject = document.title,
      description = document.title,
    } = this.props;

    const socialLinks = [
      createSocialLink({
        name: 'email',
        url: `mailto:?${stringify({ subject, body: url })}`,
        fa_icon: faEnvelope,
      }),

      createSocialLink({
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?${stringify({
          u: url,
        })}`,
        fa_icon: faFacebookSquare,
      }),

      createSocialLink({
        name: 'Twitter',
        url: `https://twitter.com/home?${stringify({
          status: `${description} ${url}`,
        })}`,
        fa_icon: faTwitterSquare,
      }),
    ];

    return (
      <div className="sharebar" aria-label="Sharebar">
        <div className="container">
          <p>Share via: </p>
          <ul className="sharebar-share">
            {socialLinks.map((value, i) => (
              <li key={value + i}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function createSocialLink({ name, url, fa_icon }) {
  return (
    <a href={url} title={`Share via ${name}`}>
      <FontAwesomeIcon icon={fa_icon} />
      {name}
    </a>
  );
}

export default Sharebar;
