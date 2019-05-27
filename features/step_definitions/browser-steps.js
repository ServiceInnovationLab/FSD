module.exports = function() {
  this.When(/^I navigate back$/, async () => {
    await driver.navigate().back();
  });

  this.When(/^I navigate forward$/, async () => {
    await driver.navigate().forward();
  });

  this.When(/^I refresh the page$/, async () => {
    await driver.navigate().refresh();
  });
}