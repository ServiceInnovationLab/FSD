module.exports = function() {
  this.Then(/^the URL "(\w+)" should be "([^"]+)"$/, async (attribute, value) => {
    const url = new URL(await driver.getCurrentUrl());
    expect(url[attribute]).to.equal(value);
  });

  this.Then(/^I am on a service page$/, async () => {
    const url = new URL(await driver.getCurrentUrl());
    // NOTE This depends on the app using hash routing, otherwise look in .pathname
    expect(url.hash).to.have.string('/FSD/service/');
  });
}