Feature: Address auto-suggest field

This field is a text entry which will provide autocomplete suggestions from the
AddressFinder API.

Background:
  Given I visit the main page

Scenario: I am typing into the address box and I use the backspace key to edit my entry
  Given I enter "asdf" into the "address-autosuggest" input
  And I press the Backspace key in the address box
  Then the address box shows "asd"

Scenario: I select and address suggestion then clear it by pressing Backspace
  Given I search near the address "36 Leach Street, New Plymouth"
  And I press the Backspace key in the address box
  Then the address box is empty
  And the URL query does not have key "address"
  And the URL query does not have key "location"
  And the URL query does not have key "latitude"
  And the URL query does not have key "longitude"

  Scenario: I select and address suggestion then clear it by pressing Clear
  Given I search near the address "36 Leach Street, New Plymouth"
  And I press the Clear key in the address box
  Then the address box is empty
  And the URL query does not have key "address"
  And the URL query does not have key "location"
  And the URL query does not have key "latitude"
  And the URL query does not have key "longitude"

  Scenario: I select and address suggestion then clear it by pressing Delete
  Given I search near the address "36 Leach Street, New Plymouth"
  And I press the Delete key in the address box
  Then the address box is empty
  And the URL query does not have key "address"
  And the URL query does not have key "location"
  And the URL query does not have key "latitude"
  And the URL query does not have key "longitude"
