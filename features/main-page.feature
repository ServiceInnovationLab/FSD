Feature: Stuff on the main page
  As a member of the public
  I want to search for relevant government services
  So I can get the support I'm entitled to

  Background:
    Given I visit the main page

  Scenario: I can see the standard search controls
    Then I see the keyword search box
    And I see the location search box
    And I see some category selectors
    And I do not see the radius selector

  Scenario: Distance options are not available for region searches
    Given I search near the address "191 Thorndon"
    Then I do not see the radius selector

  Scenario: Distance options are available for address searches, default to 25 km.
    Given I search near the address "191 Thorndon"
    Then I see the radius selector
    And The radius selector is set to "25" km radius