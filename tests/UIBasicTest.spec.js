const {test,expect} = require('@playwright/test');

test('First Test', async function({browser, page}) {
    const context = await browser.newContext();
     const age = await context.newPage();
    await age.goto('https://playwright.dev/');
    await age.screenshot({path: 'screenshot.png'});
    await age.close(); 
    await context.close();
    await page.goto('https://www.google.com/');
    await page.pause();
    
});

test('Second Test', async function({ page}) {
    
    //await page.goto('https://playwright.dev/', {waitUntil: 'load'});

    await page.goto('https://playwright.dev/');
    await page.waitForLoadState("networkidle"); /* it is discouraged to use, as playwright by default will wait for locator to be found, so we won't need it!*/

    console.log("Page title is: " + (await page.title()).toString());
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
    console.log("Page title is: " + (await page.title()).toString());
    await page.locator("//a[text()='Get started']").click();
    await expect(page).toHaveTitle("Installation | Playwright");
    console.log("Now the title is: "+ await page.title());

    const validationTextLocator = page.locator("//h2[@id='introduction']//following::p[1]");
    var validationText = await validationTextLocator.textContent();


    console.log(validationText);
    await expect(validationTextLocator).toContainText(validationText);

    console.log("-----------------------------------------");
    const multipleData = await page.locator("//h2[@id='introduction']//following::p").allTextContents();
    console.log(multipleData);

    await page.close();
    
    



});