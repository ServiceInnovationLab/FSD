Feature: Searching on the main page
  As a visitor to FSD
  I want to make a complex search
  So I can find the most relevant services

  Background:
    Given I visit the main page

  Scenario:  I search for "family"
    Given I enter "family" into the "keyword" input
    And I click on "Search"
    Then I see a list of service providers
