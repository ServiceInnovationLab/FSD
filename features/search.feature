Feature: Searching on the main page
  As a visitor to FSD
  I want to make a complex search
  So I can find the most relevant services

  Background:
    Given I visit the main page

  Scenario:  I search for "family" and get some results
    Given I enter "family" into the "keyword" input
    And I click on "Search"
    Then I see at least "5" service providers

  Scenario: I search near Thorndon Quay and get some results
    Given I search near the address "Thorndon Quay"
    Then I see at least "5" service providers

  Scenario: Address searches will autosuggest regions
      Given I enter "Thorndon Quay" into the "address-autosuggest" input
      Then The first suggestion is "Thorndon Quay, Pipitea, Wellington"

  Scenario: Address searches will autosuggest street addresses
      Given I enter "191 Thorndon" into the "address-autosuggest" input
      Then The first suggestion is "191 Thorndon Quay, Pipitea, Wellington"

