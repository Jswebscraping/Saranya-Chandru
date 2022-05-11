const puppeteer = require('puppeteer');
const fs = require('fs')
const products = fs.readFileSync("./keywords.csv",'utf-8');
const keywords = products.split(',\r\n');
console.log(keywords);


try {
(async () => {
     
     const browser = await puppeteer.launch({headless:false})
     const page = await browser.newPage()
     await page.goto('https://www.flipkart.com/', {waitUntil:'load'});
  
     await page.waitForTimeout(10000);
     await page.click("._2KpZ6l._2doB4z");
     const details = [];
     for(i=0;i<keywords.length;i++){
     await page.waitForTimeout(10000);
     await page.focus('._3704LK');
     await page.keyboard.type(keywords[i]);
     await page.click('.L0Z3Pu');
     await page.waitForTimeout(10000);

     //var button= await page.$x('//*[@id="container"]]');
     const details = [];


      //for(let j=0;j<10;j++){
      //await page.waitForTimeout(5000);

     // var button= await page.$x('//*[@id="container"]');
      //await button[j].click();
      //await page.waitForTimeout(10000);
      /*const brandname = await page.$x('//*[@class="_2WkVRV"]');
       const productname = await page.$x('//*[@class="IRpwTa"]');
       const price = await page.$x('//*[@class="_30jeq3"]');

      for(i=0;i<brandname.length;i++) {
        try{
        details.push ({
        brandname:await page.evaluate(el => el.textContent,brandname[i]),
        productname:await page.evaluate(el => el.textContent,productname[i]),
        price:await page.evaluate(el => el.textContent,price[i]),
       })
      
    }


      catch(e)
      {
          console.log("link err");
      }
    }
      */
     
    await ClearSearch(page)

    }
     //console.log(details)

    //await browser.close()
      

    })()
    async function ClearSearch(page)
 {
        const searchBox = await page.$x('//*[@id="container"]//*[@class="_3704LK"]');
        await searchBox[0].focus();
        await page.focus('._3704LK');
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control')
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(10000);
    }

}

    catch(e)
    {
        console.log("Error",e);
    }
