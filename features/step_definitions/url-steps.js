const getHashRouterQueryParams = require('../../src/utilities/hashRoutedUrls')
  .getQueryParams;

// Get an object representing the URL query parameters from the current browser URL
const getCurrentUrlQueryParameters = async () => {
  return getHashRouterQueryParams(await driver.getCurrentUrl());
};

module.exports = function() {
  const URL = require('url').URL;

  this.Then(/^the URL "(\w+)" is "([^"]+)"$/, async (attribute, value) => {
    const url = new URL(await driver.getCurrentUrl());
    expect(url[attribute]).to.equal(value);
  });

  this.Then(
    /^the URL query has key "(\w+)" with value "([^"]+)"$/,
    async (k, v) => {
      const queryParameters = await getCurrentUrlQueryParameters();
      expect(queryParameters[k]).to.equal(v);
    }
  );

  this.Then(/^the URL query does not have key "(\w+)"$/, async k => {
    const queryParameters = await getCurrentUrlQueryParameters();
    expect(queryParameters[k]).to.be.undefined;
  });

  this.Then(/^I am on a service detail page$/, async () => {
    const url = new URL(await driver.getCurrentUrl());

    // NOTE This depends on the app using hash routing, otherwise look in .pathname
    expect(url.hash).to.have.string('/FSD/service/');
  });
};
