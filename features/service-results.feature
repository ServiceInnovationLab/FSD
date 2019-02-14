Feature: 
  As a user of the FSD
  I want to see a description of available services
  So I can decide if they are useful for me

  Background:
  Given I visit the main page
  And I search for "food"

  Scenario: A service has a "Directions" link even if no location is used
  When the address box is empty
  Then I consider the first result
  And the result has a "Directions" link
  And the link URL contains "dir//"

  Scenario: A service has a "Directions" link which is populated with my location
  When I search near the address "Wellington Harbour"
  Then the first result is titled "The Salvation Army - Upper Hutt (Corps and Community Ministries)"
  And the result has a "Directions" link
  And the link URL contains "dir/-41.277678285716,174.849669865579/"