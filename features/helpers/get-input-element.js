module.exports = async function(key, value) {
  // wait for the page to load
  await driver.wait(until.elementsLocated(by[key](value)), 10000);

  return driver.findElements(by[key](value));
};
