Feature: Using the browser navigation features
When I use the browser navigation features (back, forward, refresh),
The state of the app changes in an appropriate way

Background:
  Given I visit the main page

Scenario: Categories are cleared when I go back
  Given I click on "Budgeting / Financial Capability"
  And I see at least "5" service providers
  And I navigate back
  Then no categories are selected

Scenario: Keywords are cleared when I go back
  Given I search for "age concern"
  And I see at least "5" service providers
  And I navigate back
  Then the "keyword" input is empty

Scenario: Categories remain after a page refresh
  Given I click on "Budgeting / Financial Capability"
  And I see at least "5" service providers
  And I refresh the page
  Then the "Budgeting / Financial Capability" category is selected

Scenario: Keywords remain after a page refresh
  Given I search for "age concern"
  And I see at least "5" service providers
  And I refresh the page
  Then the "keyword" input shows "age concern"