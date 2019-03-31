Feature: Example search scenarios
  As user of the FSD search
  I expect that searches based on a location will show nearby results first
  So that I can find the most accessible services

Background:
  Given I visit the main page

Scenario: I search near a location
  The scenario provided by the stakeholders expects New Plymouth Budget Advisory
  Service to be the first result, but actually another service in the same
  building is presented first. We check for both here.

  Given I search near the address "36 Leach Street, New Plymouth"
  Then I see at least "5" service providers
  And The first result is "Epilepsy Association of New Zealand Taranaki Branch"
  And a result is "New Plymouth Budget Advisory Service"

Scenario: I search with a category and a location
  Given I click on "Budgeting / Financial Capability"
  And I search near the address "36 Leach Street, New Plymouth"
  Then I see at least "5" service providers
  And The first result is "New Plymouth Budget Advisory Service"

Scenario: I search in a wide area around Wellington
  Given I click on "Child Care"
  Given I search near the address "56 The Terrace, Wellington Central"
  And I click on the "button" with "value" "100"
  And I click on "Search"
  Then I see at least "10" service providers
  And I see a "address" which says "Lower Hutt"

Scenario: I search for a phrase
  Given I enter "age concern" into the "keyword" input
  And I click on "Magnifying Glass"
  Then I see a "header" which says "Age Concern"

Scenario: I search for a service provider with an address but no street number
  Given I enter "Turanga" into the "keyword" input
  And I search near the address "Gisborne"
  Then a result is "Tūranga Ararau"

Scenario: I search and find a lot of results, but only see the top 50 service providers
  Given I enter "Citizens Advice Bureau" into the "keyword" input
  And I click on "Magnifying Glass"
  Then I see exactly "50" service providers