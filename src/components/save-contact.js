import React from 'react';

import { stripSpaces } from '../utilities/string';
import { MDBBtn } from 'mdbreact';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

class SaveContact extends React.Component {
  _save_vcard = () => {

    const vcard_content = ("BEGIN:VCARD\n" +
                          "VERSION:3.0\n" +
                          `FN:${this.props.name}\n` +
                          `ORG:${this.props.name}\n` +
                          `TEL:${stripSpaces(this.props.phoneNumber)}\n` +
                          `ADR:${this.props.address}\n` +
                          `EMAIL:${this.props.email}\n` +
                          `REV:${(new Date()).toISOString()}\n` +
                          "END:VCARD\n");
    downloadContent('contact.vcf', vcard_content);
  }

  render() {
    return (
      <MDBBtn flat onClick={this._save_vcard}>
        <div className="icon-prefix__container">
          <div className="icon-prefix__icon">
            <Icon icon={faDownload} />
          </div>
          Save Contact
        </div>
      </MDBBtn>
    );
  }
}

function downloadContent(filename, content) {
  var element = document.createElement('a');
  element.setAttribute('href',
    'data:text/x-vcard;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default SaveContact;
