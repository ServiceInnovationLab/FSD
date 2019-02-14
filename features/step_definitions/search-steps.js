

const getInputElement = require('../helpers/get-input-element');

module.exports = function() {

  this.Given(/^I search for "([^"]*)"$/, async (value) => {
    // Add the text to the keyword input
    const input_elements = await getInputElement('name', 'keyword');
    input_elements[0].sendKeys(value);
    input_elements[0].sendKeys('\n');
  });

  this.Given(/^I search near the address "([^"]*)"$/, async (value) => {
    // Add the text to the address input
    const input_elements = await getInputElement('name', 'address-autosuggest');
    input_elements[0].sendKeys(value);

    // select the top address suggestion
    await driver.wait(until.elementsLocated(by.css('#react-autowhatever-1--item-0')), 10000);
    const elements = await driver.findElements(by.css('#react-autowhatever-1--item-0'));
    elements[0].click();
  });

  this.When(/^the address box is empty$/, async () => {
    const input_elements = await getInputElement('name', 'address-autosuggest');
    expect(await input_elements[0].getText()).to.equal('');
  });
  
  this.Then(/^the first result is titled "([^"]*)"$/, async title => {
    // wait for the first result to contain the expected title
    await driver.wait(
      until.elementsLocated(
        by.xpath(`//section[@class='service__container']/section[@class='service'][1]//h2[contains(string(), '${title}')]`),
      ),
      10000,
    );

    // select the first result
    const elements = await driver.findElements(by.xpath(`//section[@class='service__container']/section[@class='service'][1]`));

    // set 'the result' for future steps
    shared.the.result = await elements[0];
  });

  this.Given(/^I consider the first result$/, async () => {
    await driver.wait(until.elementsLocated(by.css('section .service')), 10000);
    const elements = await driver.findElements(by.css('section .service'));

    // expect some results
    expect(elements.length).to.be.at.least(1);

    // set 'the result' for future steps
    shared.the.result = await elements[0];
  });

  this.Then(/^I click on the result title$/, async () => {
    const titles = await shared.the.result.findElements(by.css('h2 > a'));

    titleLink = await titles[0];

    titleLink.click();
    
    // wait for the page to be refreshed
    await driver.wait(until.stalenessOf(titleLink), 10000);
  });

  this.Then(/^the result has a "([^"]*)" link$/, async (value) => {
    
    const elements = await shared.the.result.findElements(by.linkText(value));
    
    // expect one match
    expect(elements.length).to.equal(1);

    // set 'the link' for future steps
    shared.the.link = await elements[0];
  });

  this.Then(/^the link URL contains "([^"]*)"$/, async (value) => {
    const url_string = await shared.the.link.getAttribute('href');
    expect(url_string).to.have.string(value);
  });
};
