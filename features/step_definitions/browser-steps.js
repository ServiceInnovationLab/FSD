module.exports = function() {
  this.When(/^I navigate back$/, async () => {
    await driver.navigate().back();
    return await driver.sleep(5000);
  });

  this.When(/^I navigate forward$/, async () => {
    return await driver.navigate().forward();
  });

  this.When(/^I refresh the page$/, async () => {
    return await driver.navigate().refresh();
  });
}