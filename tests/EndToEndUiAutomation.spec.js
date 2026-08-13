const { test, expect } = require('@playwright/test');


test('Full End to End order place Flow', async function ({ page }) {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const UserNameLoc = page.locator("[type='email']");
    const PasswordLoc = page.locator("[type='password']");

    const userName = "subhadipdutta180@gmail.com";
    const psw = "Office@2026";

    await UserNameLoc.fill(userName);
    await PasswordLoc.fill(psw);

    await page.locator("input[name='login']").click();

    const homePageLogoText = await page.locator("//div[contains(@class,'logo-holder')]//p").textContent();

    console.log(homePageLogoText);

    await expect(page.locator("//div[contains(@class,'logo-holder')]//p")).toContainText("Automation Practice");

    if (homePageLogoText === "Automation Practice") {
        console.log("Javascript logic matched !!!");
    } else {
        console.log("Javascript logic did not matched !!!");
    }

    const searchProduct = await page.locator("//div[@class='card']//h5").allTextContents();
    const rquiredProduct = "ZARA COAT 3";
    const price = "$ 11500";


    const index = searchProduct.indexOf(rquiredProduct);
    if (index === -1) {
        throw new Error(`Product not found: ${requiredProduct}`);
    }

    let position = index + 1;

    const addToCartLoc = `(//div[@class='card']//h5)[${position}]/../button[2]`;

    await page.locator(addToCartLoc).click();

    await page.locator("//button[@routerlink='/dashboard/cart']").click();

    await expect(page.locator("//div[@class='cartSection']/h3")).toContainText(rquiredProduct);
    await expect(page.locator("div[class='prodTotal cartSection'] p")).toContainText(price);

    await page.locator("button[type='button']").nth(1).click();

    await expect(page.locator("div[class='payment__title']").nth(0)).toContainText(" Payment Method ");

    const checkoutPageInputLoc = page.locator("//div[@class='title']/../input");

    await checkoutPageInputLoc.nth(1).fill("124");
    await checkoutPageInputLoc.nth(2).fill("SUBHA");
    await checkoutPageInputLoc.nth(3).fill("rahulshettyacademy");


    await page.locator("//button[text()='Apply Coupon']").click();

    const successMessageLocator = page.locator("div[class='field small'] p");

    await expect(successMessageLocator).toContainText("* Coupon Applied");

    const shipInfoLoc = page.locator("div[class='user__name mt-5'] input");


    await shipInfoLoc.last().waitFor();

    const actualEmail = await shipInfoLoc.nth(0).inputValue();

    if (actualEmail === userName) {
        console.log("The email address is matching!");
    } else {
        throw new Error(`Email address not matching: ${actualEmail}`);

    }
    const dropDown = shipInfoLoc.nth(1);

    // await shipInfoLoc.nth(1).fill("India");
    await dropDown.pressSequentially("Ind");
    await page.locator("section.ta-results").waitFor();
    const options = page.locator("section.ta-results button");

    for (let i = 0; i < await options.count(); i++) {

        console.log("option: " + await options.locator("span").nth(i).textContent());

        if (await options.locator("span").nth(i).textContent() === " India") {
            await options.nth(i).click();
            break;
        }

    }


    await page.locator("//a[text()='Place Order ']").click();

    await expect(page.locator("h1[class='hero-primary']")).toContainText(" Thankyou for the order. ");

    const orderNum = await page.locator("label.ng-star-inserted").textContent();
    console.log(`Order Number: ${orderNum}`);

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    const orderNumLocator = await page.locator("tr.ng-star-inserted th");

    await orderNumLocator.last().waitFor();
    const count = await orderNumLocator.count();
    console.log(`count: ${count}`);
    for (let i = 0; i < await orderNumLocator.count(); i++) {

        const actualOrderNum = await orderNumLocator.nth(i).textContent();

        console.log(`Order Id: ${actualOrderNum}`);

        if (orderNum.includes(actualOrderNum)) {
            console.log("Order number matched!");
            await page.locator("tr.ng-star-inserted").nth(i).locator("button").first().click();
            break;

        }


    }

    await expect(page.locator("div.title")).toHaveText(rquiredProduct);

const OrderPageValidationNum = await page.locator("//small[@class='col-title']/../div").textContent();

console.log(OrderPageValidationNum);

 if (orderNum.includes(OrderPageValidationNum)) {
       console.log("Order number matched!");

 }else{
    throw new Error("Order number did not matched!!"); 
 }
   
    await page.close();
});