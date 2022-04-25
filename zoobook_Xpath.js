const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

// set viewport (just in case for nice viewing)
await page.setViewport({width: 1366, height: 768});
await page.goto('https://en.wikipedia.org/wiki/Zoobooks' , {waitUntil:'networkidle2',timeout:0});
await page.waitForTimeout(40000);

// wait for element defined by XPath appear in page
await page.waitForXPath("(/html/body/div[3]/div[3]/div[5]/div[1]/ul[1])");

// evaluate XPath expression of the target selector (it return array of ElementHandle)
let elHandle = await page. $x("(/html/body/div[3]/div[3]/div[5]/div[1]/ul[1])");

    
// prepare to get the textContent of the selector above (use page.evaluate)
let zoobooks = await page.evaluate(el => el.textContent, elHandle[0]);

console.log(zoobooks);

 // close the browser
 await browser.close();
})();


