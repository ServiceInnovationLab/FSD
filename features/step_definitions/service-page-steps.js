module.exports = function() {
  this.Then(/^the page shows a provider$/, async () => {
    await driver.wait(until.elementsLocated(by.css('section .service')), 10000);
    const elements = await driver.findElements(by.css('section .service'));

    // expect one match
    expect(elements.length).to.equal(1);

    // set 'the provider' for future steps
    shared.the.provider = await elements[0];
  });
};
