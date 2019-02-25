Feature: Service detail
  As a user of the FSD
  I want to see a description of available services
  So I can decide if they are useful for me

  Background:
  Given I visit the main page
  And I search for "food"

  Scenario: A service has a "Directions" link even I didn't enter my location
  When the address box is empty
  Then I consider the first result
  And I click on the result title
  Then I am on a service detail page
  And the page shows a provider
  And the provider has a "Directions" link
  And the link URL contains "dir//"

  Scenario: A service has a "Directions" link which is populated with my location
  When I search near the address "Wellington Harbour"
  Then the first result is titled "The Salvation Army - Miramar (Corps)"
  And I click on the result title
  Then I am on a service detail page
  And the page shows a provider
  And the provider has a "Directions" link
  And the link URL contains "dir/-41.277678285716,174.849669865579/"
