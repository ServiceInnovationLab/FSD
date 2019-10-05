const queryString = require('query-string');

// About Hash-Routing
//
// A hash-routed url is a url scheme used by single-page React apps which are
// served from a single URL but want to simulate the experience of a more
// traditional web site with sub-pages. This is achieved by formatting all of
// the web site URLS as a base URL where the app is loaded from, plus an
// additional relative route which is contained in the hash/fragment portion of
// the URL. This means that HTTP requests to the web app will always be directed
// to the base URL, and once loaded the app can interpret the relative path from
// the URL fragment itself.
//
// For example, a traditional URL to a static page in a web site:
//
// https://www.myhost.com/myappbasepath/pages/welcome.html
//
// A hash-routed equivalent:
//
// https://www.myhost.com/myappbasepath/#/pages/welcome.html
//
// To a site user the URLs look very similar and are easy to interpret, but the
// # character significantly changes the way the URL is parsed.
//
// Within a web app we often want to get the URL query parameters and use them
// within the code of the app. With a normal URL there are standard functions to
// parse out the different parts of a URL, but with hash routing the relative
// path, query, and maybe a further fragment, are all moved into the fragment
// section of the URL. A custom URL parsing function is required.

// Retrieve the path portion of a hash-routed URL.
//
// This is the path after the first hash. Note that There mgiht also be a path
// as part of the main URL which will be ignored by this function.
const getRelativePath = urlString => {
  return getUrlFragmentGroups(urlString)[2] || '';
};

// Retrieve the query portion of a hash-routed URL, parsed as an object where
// each key is an attribute.
const getQueryParams = urlString => {
  return queryString.parse(getUrlFragmentGroups(urlString)[3] || '');
};

// Retrieve the URL fragment portion of a hash-routed URL
//
// This is unusual because it will be after the second hash in a URL, which
// might not actually be supported.
const getFragment = urlString => {
  return getUrlFragmentGroups(urlString)[4] || '';
};

// Parse a hash-routed URL to extract the main URL (everything before the
// fragment), and also parse a path, query, and fragment out of the 'main'
// fragment
//
// If the regex doesn't match it returns an emtpy object with an empty groups
// attribute as a convenience for the caller.
const getUrlFragmentGroups = urlString => {
  const regex = /^([^#]*)#([^?#]*)?(\?[^?#]*)?(#[^#?]*)?$/g;
  const matches = regex.exec(urlString);
  return matches || { groups: {} };
};

module.exports = {
  getRelativePath,
  getQueryParams,
  getFragment,
};
