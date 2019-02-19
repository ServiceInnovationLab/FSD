Feature: Stuff on the main page
  As a member of the public
  I want to search for relevant government services
  So I can get the support I'm entitled to

  Background:
    Given I visit the main page

  Scenario: Search controls
    Then I should see the keyword search box
    And I should see the location search box
    And I should see some category selectors