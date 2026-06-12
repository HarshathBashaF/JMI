import { Builder, By, until } from 'selenium-webdriver';

(async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://127.0.0.1:5174');
    await driver.wait(until.elementLocated(By.xpath("//button[contains(normalize-space(.), 'Go to Dashboard') or contains(normalize-space(.), 'Dashboard')]")), 10000);
    const button = await driver.findElement(By.xpath("//button[contains(normalize-space(.), 'Go to Dashboard') or contains(normalize-space(.), 'Dashboard')]") );
    console.log('Home button visible');
    await button.click();
    await driver.wait(until.urlContains('/dashboard'), 10000);
    console.log('Dashboard loaded');
    const navCount = await driver.executeScript("return document.querySelectorAll('nav').length");
    const linkCount = await driver.executeScript("return document.querySelectorAll('header nav a, aside nav a, nav a').length");
    console.log('Nav elements count:', navCount);
    console.log('Link elements count:', linkCount);
    const links = await driver.executeScript(`return Array.from(document.querySelectorAll('header nav a, aside nav a, nav a')).map(el => ({href: el.href, text: el.innerText.trim(), outer: el.outerHTML}));`);
    console.log('Links:', links);
  } catch (e) {
    console.error('ERROR:', e);
    const src = await driver.getPageSource();
    console.log('SOURCE:', src.slice(0, 2000));
  } finally {
    await driver.quit();
  }
})();
