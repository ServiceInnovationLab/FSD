Feature:
  As user of the FSD search
  I expect that searches based on a location will show nearby results first
  So that I can find the most accessible services

Background:
  Given I visit the main page

Scenario:
  Given I enter "32 Leach Street New Plymouth" into the "address-autosuggest" input
  And The first suggestion is "32 Leach Street, New Plymouth 4310"
  And I click on the first address suggestion
  Then I see at least "1" service providers
  And The first result is "New Plymouth Budget Service"