const getInputElement = require('../helpers/get-input-element');
const webdriver = require('selenium-webdriver');

const Keys = webdriver.Key;

module.exports = function() {
  this.Given(/^I search for "([^"]*)"$/, async value => {
    // Add the text to the keyword input
    const input_elements = await getInputElement('name', 'keyword');
    // Clear field by select all + delete. React doesn't allow the standard .clear()
    input_elements[0].sendKeys(
      Keys.END,
      Keys.chord(Keys.SHIFT, Keys.HOME),
      Keys.BACK_SPACE,
      value,
      Keys.RETURN
    );

    // Wait until the search description is updated with the new query
    await driver.wait(
      until.elementTextContains(
        driver.findElement(by.css('section.search__criteria')),
        value
      )
    );
  });

  this.Given(/^I select the category "([^"]*)"$/, async value => {
    // Click on the category button
    driver
      .wait(
        until.elementLocated(
          by.xpath(
            `//*[contains(@class, 'category__container')]/button[contains(@class, 'category__button')][contains(text(), '${value}')]`
          ),
          10000
        )
      )
      .click();

    // Wait until the search description is updated with the new query
    await driver.wait(
      until.elementTextContains(
        driver.findElement(by.css('section.search__criteria')),
        `in: ${value}`
      )
    );
  });

  this.Given(/^I search near the address "([^"]*)"$/, async value => {
    // Add the text to the address input
    const input_elements = await getInputElement('name', 'address-autosuggest');
    input_elements[0].sendKeys(value);

    // Select the top address suggestion which matches the input. We need to
    // check that the suggestion matches the search because the suggestion
    // values can lag behind the typing due to the small amount of time it takes
    // for them to load.
    let elements = await driver.findElements(
      by.xpath(
        `//*[@id='react-autowhatever-1--item-0']//div[contains(text(), '${value}')]`
      )
    );

    // Press enter, wait and try again if no suggestions were loaded. Happens
    // sometimes.
    if (elements.length == 0) {
      // Trigger a requery of suggestions
      //
      // Sends space then backspace. Note that the address suggestions are
      // sensitive to punctuation, so just pressing space would remove
      // suggestions where the next character should be a comma.
      input_elements[0].sendKeys(' \b');

      elements = await driver.wait(
        until.elementsLocated(
          by.xpath(
            `//*[@id='react-autowhatever-1--item-0']//div[contains(text(), '${value}')]`
          )
        ),
        10000
      );

      // There's a chance that still no element has been found, but that hasn't
      // been observed.
    }

    elements[0].click();

    await driver.wait(until.stalenessOf(elements[0]));
  });

  this.When(/^the address box is empty$/, async () => {
    const input_elements = await getInputElement('name', 'address-autosuggest');
    expect(await input_elements[0].getAttribute('value')).to.equal('');
  });

  this.Then(/^the address box shows "([^"]*)"$/, async value => {
    const input_elements = await getInputElement('name', 'address-autosuggest');
    const text = await input_elements[0].getAttribute('value');
    expect(text).to.equal(value);
  });

  this.Then(/^I press the Backspace key in the address box$/, async () => {
    const input_elements = await getInputElement('name', 'address-autosuggest');
    input_elements[0].sendKeys(Keys.BACK_SPACE);
  });

  this.Then(/^I press the Clear key in the address box$/, async () => {
    const input_elements = await getInputElement('name', 'address-autosuggest');
    input_elements[0].sendKeys(Keys.CLEAR);
  });

  this.Then(/^I press the Delete key in the address box$/, async () => {
    const input_elements = await getInputElement('name', 'address-autosuggest');
    input_elements[0].sendKeys(Keys.DELETE);
  });

  this.Then(/^the first result is titled "([^"]*)"$/, async title => {
    // wait for the first result to contain the expected title
    await driver.wait(
      until.elementsLocated(
        by.xpath(
          `//section[@class='service__container']/section[@class='service'][1]//*[@class='service__name']//*[contains(string(), '${title}')]`
        )
      ),
      10000
    );

    // select the first result
    const elements = await driver.findElements(
      by.xpath(
        `//section[@class='service__container']/section[@class='service'][1]`
      )
    );

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
    const titles = await shared.the.result.findElements(
      by.css('.service__name > a')
    );

    const titleLink = await titles[0];

    titleLink.click();

    // wait for the page to be refreshed
    await driver.wait(until.stalenessOf(titleLink), 10000);
  });

  this.Then(/^the result has a "([^"]*)" link$/, async value => {
    const elements = await shared.the.result.findElements(by.linkText(value));

    // expect one match
    expect(elements.length).to.equal(1);

    // set 'the link' for future steps
    shared.the.link = await elements[0];
  });

  this.Then(/^the link URL contains "([^"]*)"$/, async value => {
    const url_string = await shared.the.link.getAttribute('href');
    expect(url_string).to.have.string(value);
  });

  this.Then(/^the link URL does not contain "([^"]*)"$/, async value => {
    const url_string = await shared.the.link.getAttribute('href');
    expect(url_string).not.to.have.string(value);
  });
};
