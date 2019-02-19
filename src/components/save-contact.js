import React from 'react';

import { stripSpaces } from '../utilities/string';

class SaveContact extends React.Component {
  _save_vcard = () => {
    const { name, phoneNumber, address, email } = this.props

    const vcard_content = ("BEGIN:VCARD\n" +
                          "VERSION:3.0\n" +
                          `FN:${name}\n` +
                          `ORG:${name}\n` +
                          `TEL:${stripSpaces(phoneNumber)}\n` +
                          `ADR:${address}\n` +
                          `EMAIL:${email}\n` +
                          `REV:${(new Date()).toISOString()}\n` +
                          "END:VCARD\n");
    downloadContent(`${_filenameize(name)}.vcf`, vcard_content);
  }

  _filenameize = text => text.replace(/[^A-z0-9]/g, '_');
  
  render() {
    return (
      <div>
        <button onClick={this._save_vcard}>Save Contact</button>
      </div>
    );
  }
}

function downloadContent(filename, content) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/x-vcard;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);

  element.click();
}

export default SaveContact;
