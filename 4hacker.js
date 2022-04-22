const puppeteer = require('puppeteer');

try{
(async() => {
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

await page.goto('https://news.ycombinator.com/' , {waitUntil:'load'});
await page.waitForTimeout(1500);
let details=[];
const all = await page.$$('.athing > td:last-child ');
for(let i = 0;i<10;i++){
    var website = await all[i].$eval('.titlelink', a => a.innerText);
    var weburl = await all[i].$eval('.titlelink',a => a.href);
    details.push({
        Website : website,
        WebURL : weburl,
    });
}

console.log(details)
await browser.close();



})()
}
catch(e)
{
    console.log("Error",e);
}
