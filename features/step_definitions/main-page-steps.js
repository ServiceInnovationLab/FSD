const getInputElement = require('../helpers/get-input-element')
const getAttribute = require('../helpers/get-attribute-for-input').default

module.exports = function () {
  this.When(/^I visit the main page$/, async () => {
    return driver.get(shared.host.siteRoot);
  });

  // Expect one input with name=keyword, enabled, type=text
  this.Then(/^I should see the keyword search box$/, async () => {
    const input_elements = await getInputElement('name', 'keyword')
    expect(input_elements.length).to.equal(1)
    
    // check the attributes are correct
    const keyword_box = input_elements[0]

    expect(getAttribute(keyword_box, 'type')).to.equal('text');
    expect(getAttribute(keyword_box,'disabled')).to.be.null
  });

  // Expect one input with placeholder="Start typing an address", enabled, type=text
  this.Then(/^I should see the location search box$/, async () => {
    const input_elements = await getInputElement('name', 'address-autosuggest')
    expect(input_elements.length).to.equal(1)

    // check the attributes are correct
    const location_box = input_elements[0]
    
    expect(getAttribute(location_box, 'type')).to.equal('text');
    expect(getAttribute(location_box,'disabled')).to.be.null
  });

  // Expect more than one category button
  this.Then(/^I should see some category selectors$/, async () => {
    categories = await getInputElement('css', '.category__container > .category__button');
    expect(categories.length).to.be.above(1);
  });
}