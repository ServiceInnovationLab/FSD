module.exports = function () {
  this.When(/^I visit the main page$/, function () {
    return driver.get('localhost:3000/');
  });

  this.Then(/^I should see the keyword search box$/, function () {

    // driver wait returns a promise so return that
    return driver.wait(until.elementsLocated(by.css('input[name=keyword]')), 10000)
        .then(() => driver.findElements(by.css('input[name=keyword]')))
        .then(function (elements) {
            // Expect one matching enabled element with type=text
            expect(elements.length).to.equal(1)
            const element = elements[0]

            element.getAttribute('type')
                .then(function(value) {
                    expect(value).to.equal('text')
                });

            element.getAttribute('enabled')
                .then(function(value) {
                    expect('disabled').not.to.equal(true)
                })
                0
            return elements
        });
  });

  this.Then(/^I should see the location search box$/, function () {

    // driver wait returns a promise so return that
    return driver.wait(until.elementsLocated(by.css('input[placeholder="Enter a location"]')), 10000)
        .then(() => driver.findElements(by.css('input[placeholder="Enter a location"]')))
        .then(function (elements) {
            // Expect one matching enabled element with type=text
            expect(elements.length).to.equal(1)
            const element = elements[0]

            element.getAttribute('type')
                .then((value) => expect(value).to.equal('text'));

            element.getAttribute('enabled')
                .then((value) => expect('disabled').not.to.equal(true));

            return elements
        });
  });

  this.Then(/^I should see some category selectors$/, function () {

    // driver wait returns a promise so return that
    return driver.wait(until.elementsLocated(by.css('.category__container')), 10000).then(function(){

        // return the promise of an element to the following then.
        return driver.findElements(by.css('.category__container > .category__button'));
    })
    .then((elements) => expect(elements.count).to.not.equal(0));
  });
}