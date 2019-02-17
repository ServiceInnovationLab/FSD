Feature: Github Pages
  Deployment to Github pages requires some specific settings to work properly.
  These tests will warn if any configuration seems incorrect.

Scenario: Using HashRouter to store the URL path in the URL fragment instead
  Github Pages will only serve from the base URL of the deployed app. App pages
  beneath the root URL will return a 404 from Github Pages before the internal
  React router gets an opportunity to correctly route them. One workaround is to
  use the React `HashRouter` which uses the URL fragment to store the path below
  the app route. There's another option to reconfigure the Github Pages 404
  behaviour to serve a redirect, but that's pretty extreme. See
  `https://stackoverflow.com/questions/40776651/can-i-create-routes-with-react-router-for-a-github-pages-site`
  for more discussion.

  Given I visit the main page
  Then the URL "pathname" is "/"
  And the URL "hash" is "#/"