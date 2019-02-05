module.exports = function () {
  this.When(/^I visit the main page$/, function () {
    return driver.get('localhost:3000/');
  });

  this.Then(/^I should see the keyword search box$/, function () {

    // driver wait returns a promise so return that
    return driver.wait(until.elementsLocated(by.css('input[name=keyword]')), 10000)
        .then(() => driver.findElements(by.css('input[name=keyword]')))
        .then((input_elements) => {
            // Expect one matching enabled element with type=text
            expect(input_elements.length).to.equal(1)
            const keyword_box = input_elements[0]

            keyword_box.getAttribute('type')
                .then((type) => expect(type).to.equal('text'));

            keyword_box.getAttribute('disabled')
                .then((disabled) => expect(disabled).to.be.null);
        });
  });

  this.Then(/^I should see the location search box$/, function () {

    // driver wait returns a promise so return that
    return driver.wait(until.elementsLocated(by.css('input[placeholder="Enter a location"]')), 10000)
        .then(() => driver.findElements(by.css('input[placeholder="Enter a location"]')))
        .then(function (input_elements) {
            // Expect one matching enabled element with type=text
            expect(input_elements.length).to.equal(1)
            const location_box = input_elements[0]

            location_box.getAttribute('type')
                .then((type) => expect(type).to.equal('text'));

            location_box.getAttribute('disabled')
                .then((disabled) => expect(disabled).to.be.null);
        });
  });

  this.Then(/^I should see some category selectors$/, function () {

    // driver wait returns a promise so return that
    return driver.wait(until.elementsLocated(by.css('.category__container > .category__button')), 10000)
        .then(() => driver.findElements(by.css('.category__container > .category__button')))
        .then((categories) => expect(categories.length).to.be.above(1));
  });
}