const getInputElement = require('../helpers/get-input-element')

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

    const type_attribute = await keyword_box.getAttribute('type')
    expect(type_attribute).to.equal('text');

    const disabled_attribute = await keyword_box.getAttribute('disabled')
    expect(disabled_attribute).to.be.null;
  });

  // Expect one input with placeholder="Start typing an address", enabled, type=text
  this.Then(/^I should see the location search box$/, async () => {
    const input_elements = await getInputElement('name', 'address-autosuggest')
    expect(input_elements.length).to.equal(1)

    // check the attributes are correct
    const location_box = input_elements[0]
    
    const type_attribute = await location_box.getAttribute('type')
    expect(type_attribute).to.equal('text');

    const disabled_attribute = await location_box.getAttribute('disabled')
    expect(disabled_attribute).to.be.null;
  });

  // expect more than one category button
  this.Then(/^I should see some category selectors$/, async () => {
    categories = await getInputElement('css', '.category__container > .category__button');
    expect(categories.length).to.be.above(1);
  });

    // expect more the search radius selector widget
    this.Then(/^I should see the radius selector$/, async () => {

      // wait for the page to load
      await driver.wait(until.elementsLocated(by.css('form > div.radio-group')), 10000);
  
      // expect there to be 4 radius buttons
      categories = await driver.findElements(by.css('input[name="radius"]'));
      expect(categories.length).to.equal(4);
    });

    this.Given(/^I enter "([^"]*)" into the "([^"]*)" input$/, async (value, input_name) => {
      // wait for the page to load
      await driver.wait(until.elementsLocated(by.css(`input[name=${input_name}]`)), 10000);
  
      const input_elements = await driver.findElements(by.css(`input[name=${input_name}]`));

      input_elements[0].sendKeys(value);
    });

    this.Given(/^I click on "([^"]*)"$/, async (text) => {
      const element = await helpers.getFirstElementContainingText('button', text);
      element.click();
    });

    this.Then(/^I see a list of service providers$/, async () => {
      await driver.wait(until.elementsLocated(by.css('section .service')), 10000);
      const elements = await driver.findElements(by.css('section .service'));

      // expect some results
      expect(elements.length).to.be.above(1);
    });

    this.Then(/^I click on the first address suggestion$/, async() => {
      await driver.wait(until.elementsLocated(by.css('#react-autowhatever-1--item-0')), 10000);
      const elements = await driver.findElements(by.css('#react-autowhatever-1--item-0'));
      elements[0].click();
    });
}