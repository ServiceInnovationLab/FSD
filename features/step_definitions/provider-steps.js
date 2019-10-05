module.exports = function() {
  this.Then(/^the provider has a "([^"]*)" link$/, async value => {
    const elements = await shared.the.provider.findElements(by.linkText(value));

    // expect one match
    expect(elements.length).to.equal(1);

    // set 'the link' for future steps
    shared.the.link = await elements[0];
  });
};
