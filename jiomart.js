const puppeteer = require('puppeteer');
try {
(async () => {
     
     const browser = await puppeteer.launch({headless:false})
     const page = await browser.newPage()
     await page.setViewport({ width: 1280, height: 800 })
     await page.goto('https://www.jiomart.com/', {waitUntil:'networkidle2',timeout:0});
     await page.focus('.input-text');
     await page.keyboard.type('Dairy');
     await page.keyboard.press('Enter')
     await page.waitForTimeout(5000);
     await page.focus('.ais-SearchBox-input');
     await page.keyboard.type('Dairy & Bakery');
     await page.keyboard.press('Enter');
     await page.waitForTimeout(10000);
     var button= await page.$x('//*[@id="sort_container"]//button');
     const details = [];
     for(let j=0;j<button.length-1;j++){
     //await page.waitForTimeout(10000);

     var button= await page.$x('//*[@id="sort_container"]//button');
     await button[j].click();
     await page.waitForTimeout(20000);
     const Title = await page.$x('//*[@class="clsgetname"]');
     const Price = await page.$x('//*[@id="final_price"]');
     for(i=0;i<Title.length;i++) {
        try{
        details.push ({
        Title:await page.evaluate(el => el.textContent,Title[i]),
        Price:await page.evaluate(el => el.textContent,Price[i]),
       })
      }
      catch(e)
    {
        console.log("link err");
    }
      }
    }
      console.log(details)
      await browser.close();
})()
    }

    catch(e)
    {
        console.log("Error",e);
    }
