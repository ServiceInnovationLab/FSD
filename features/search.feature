Feature: Searching on the main page
  As a visitor to FSD
  I want to make a complex search
  So I can find the most relevant services

  Background:
    Given I visit the main page

  Scenario:  I search for "family" and get some results
    Given I enter "family" into the "keyword" input
    And I click on "Magnifying Glass"
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

  Scenario: When I select an address suggestion it is used as a search parameter
      Given I enter "191 Thorndon" into the "address-autosuggest" input
      And The first suggestion is "191 Thorndon Quay, Pipitea, Wellington 6011"
      And I click on the first address suggestion
      Then the address box shows "191 Thorndon Quay, Pipitea, Wellington 6011"
      And the URL query has key "address" with value "191 Thorndon Quay, Pipitea, Wellington 6011"
      And the URL query does not have key "location"
      And the URL query has key "latitude" with value "-41.2717302167"
      And the URL query has key "longitude" with value "174.7817695667"

