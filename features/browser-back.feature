Feature: Using the browser back button.
When I use the back button in my browser
I expect it to go back to the correct previous state

Background:
  Given I visit the main page

Scenario: I search with a category then navigate back and the category is unselected
  Given I click on "Budgeting / Financial Capability"
  And I see at least "5" service providers
  And I navigate back
  Then no categories are selected

Scenario: I search with a keyword then navigate back and the keyword is cleared
  Given I search for "age concern"
  And I see at least "5" service providers
  And I navigate back
  Then the "keyword" input is empty