import React from 'react';
import Button from '@material-ui/core/Button';
import { stripSpaces } from '../utilities/string';

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
      <Button onClick={this._save_vcard}>
        Save Contact
      </Button>
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
