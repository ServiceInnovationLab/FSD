import React from 'react';
import { stringify } from 'querystring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare, 
  faTwitterSquare
} from '@fortawesome/free-brands-svg-icons';

class Sharebar extends React.Component {

  render(){
    const { 
      url = window.location.href, 
      subject = document.title, 
      description = document.title 
    } = this.props

    const socialLinks = [

      <SocialLink
        name='email'
        url={`mailto:?${stringify({subject: subject, body: url})}`}
        fa_icon={faEnvelope} />,
        
      <SocialLink
        name='Facebook'
        url={`https://www.facebook.com/sharer/sharer.php?${stringify({u: url})}`}
        fa_icon={faFacebookSquare} />,
        
      <SocialLink
        name='Twitter'
        url={`https://twitter.com/home?${stringify({status: description+' '+url})}`}
        fa_icon={faTwitterSquare} />,
    ]
    
    return (
      <div className="sharebar" aria-label="Sharebar">
        <div className="container">
          <p>Share via: </p>
          <ul className="sharebar-share">
            { socialLinks.map(value => <li>{value}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

class SocialLink extends React.Component {
  render(){
    const { name, url, fa_icon } = this.props

    return <a href={url} title={`Share via ${name}`}><FontAwesomeIcon icon={fa_icon} />{name}</a>
  }
}

export default Sharebar;
