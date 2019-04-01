module.exports = function() {
  const URL = require('url').URL;
  const parseQueryString = require('query-string').parse;
  
  this.Then(/^the URL "(\w+)" is "([^"]+)"$/, async (attribute, value) => {
    const url = new URL(await driver.getCurrentUrl());
    expect(url[attribute]).to.equal(value);
  });

  this.Then(/^the URL query has key "(\w+)" with value "([^"]+)"$/, async (k, v) => {
    const url = new URL(await driver.getCurrentUrl());
    const queries = parseQueryString(url['search']);
    expect(queries[k]).to.equal(v);
  });

  this.Then(/^the URL query does not have key "(\w+)"$/, async k => {
    const url = new URL(await driver.getCurrentUrl());
    const queries = parseQueryString(url['search']);
    expect(queries[k]).to.be.undefined
  });

  this.Then(/^I am on a service detail page$/, async () => {
    const url = new URL(await driver.getCurrentUrl());

    // NOTE This depends on the app using hash routing, otherwise look in .pathname
    expect(url.hash).to.have.string('/FSD/service/');
  });
}