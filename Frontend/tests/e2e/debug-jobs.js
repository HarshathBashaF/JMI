import { Builder, By, until } from 'selenium-webdriver';

(async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://127.0.0.1:5174/jobs');
    await driver.wait(until.urlContains('/jobs'), 10000);
    const searchInputs = await driver.executeScript("return Array.from(document.querySelectorAll('input')).map(i => ({placeholder: i.placeholder, type: i.type, outer: i.outerHTML}));");
    console.log('Search inputs:', JSON.stringify(searchInputs, null, 2));
    const selectEls = await driver.executeScript("return Array.from(document.querySelectorAll('select, input')).map(e => ({tag: e.tagName, placeholder: e.placeholder || '', type: e.type || '', outer: e.outerHTML}));");
    console.log('Select & input elements count:', selectEls.length);
  } catch (e) {
    console.error(e);
  } finally {
    await driver.quit();
  }
})();
