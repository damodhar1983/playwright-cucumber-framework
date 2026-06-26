
Feature: Contact Page Validation
  @TC1
  Scenario Outline: Verify mandatory field validation messages are displayed and cleared
    Given I navigate to the Contact page
    When I click the Submit button
    Then I should see validation errors for mandatory fields
    When I enter valid contact details "<forename>" "<email>" "<message>"
    Then all validation errors should be cleared

    Examples:
      | forename | email              | message                  |
      | damodhar | damodhar@gmail.com | Mandatory fields entered |



  @TC2
  Scenario Outline: Submit contact form successfully
    Given I navigate to the Contact page
    When I enter valid contact details "<forename>" "<email>" "<message>"
    When I click the Submit button
    Then I should see a successful submission message

    Examples:
      | forename | email              | message                  |
      | damodhar | damodhar@gmail.com | Mandatory fields entered |
      | damodhar | damodhar@gmail.com | Mandatory fields entered |
      | damodhar | damodhar@gmail.com | Mandatory fields entered |
      | damodhar | damodhar@gmail.com | Mandatory fields entered |
      | damodhar | damodhar@gmail.com | Mandatory fields entered |


  @TC3
  Scenario: Verify cart calculations

    Given I navigate to the Shop page

    When I add 2 "Stuffed Frog" to the cart
    And I add 5 "Fluffy Bunny" to the cart
    And I add 3 "Valentine Bear" to the cart

    And I navigate to the Cart page

    Then the subtotal should equal unit price multiplied by quantity for each product

    And the cart total should equal the sum of all subtotals