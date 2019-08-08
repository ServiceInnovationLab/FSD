module.exports = function() {
  this.When(/^I navigate back$/, async () => {
    const old_url = await driver.getCurrentUrl();

    driver.navigate().back();

    await driver.wait(async () => {
      return (await driver.getCurrentUrl()) !== old_url;
    });
  });

  this.When(/^I navigate forward$/, async () => {
    const old_url = await driver.getCurrentUrl();

    await driver.navigate().forward();

    await driver.wait(async () => {
      return (await driver.getCurrentUrl()) !== old_url;
    });
  });

  this.When(/^I refresh the page$/, async () => {
    const body = await driver.findElement(by.css('body'));

    driver.navigate().refresh();

    await driver.wait(until.stalenessOf(body));
  });
};
