const puppeteer = require('puppeteer');
const fs = require('fs')

try {
(async() => {
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

await page.goto('https://blinkit.com/prn/eno-lemon-digestive-antacid/prid/10841' , {waitUntil:'load'});
await page.waitForTimeout(1500);

var title= await page.$eval('.css-cens5h', div=>div.innerText)
var weight= await page.$eval('.r-15zivkp', div=>div.innerText)
var price=await page.$eval('.r-1d4mawv', div=>div.innerText)
var product=await page.$eval('.product-details__header',div=>div.innerText)
var a=await page.$eval('.product-attributes--additional-properties', span=>span.innerText)


let details=[];
details.push({
    
    title:title,
    weight:weight,
    price:price,
    product:product,
    details:a

})
console.log(details)

await browser.close();

fs.writeFile("details.json",JSON.stringify(details,'',2),(err) => {
    if(err){console.log(err)}
    else{console.log('Saved Successfully!')}
});

})()
}
catch(e)
{
    console.log("Error",e);
}

