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