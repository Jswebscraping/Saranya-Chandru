const puppeteer = require('puppeteer');
const fs = require('fs')


try {
(async () => {
     
     const browser = await puppeteer.launch({headless:false})
     const page = await browser.newPage()
     await page.setViewport({ width: 1280, height: 800 })
     await page.goto("https://www.bigbasket.com/", {waitUntil:'networkidle2',timeout:0});
     await page.focus('#input');
     await page.keyboard.type('Beverages');
     await page.click('.bb-search');
     await page.waitForTimeout(5000);
     var button= await page.$x('//*[@id="deck"]/div[5]/div/div/label/span[2]');
   

      const details = [];
      for(let j=0;j<button.length;j++){
      await page.waitForTimeout(5000);

      var button= await page.$x('//*[@id="deck"]/div[5]/div/div/label/span[2]');
      await button[j].click();
      await page.waitForTimeout(10000);
      const brandname = await page.$x('//*[@class="col-sm-12 col-xs-7 prod-name"]//h6[1]');
      const productname=await page.$x('//product-template/div/div[4]/div[1]/a');
      const price=await page.$x('//*[@class="discnt-price"]');
      const quantity=await page.$x('//*[@class="btn-group btn-input clearfix ng-scope"]');

      for(i=0;i<brandname.length;i++) {
      try{
      details.push ({
      brandname:await page.evaluate(el => el.textContent,brandname[i]),
      productname:await page.evaluate(el => el.textContent,productname[i]),
      price:await page.evaluate(el => el.textContent,price[i]),
      quantity:await page.evaluate(el => el.textContent,quantity[i]),
     })
    }
    catch(e)
    {
        console.log("link err");
    }
      }
      const clearbutton=await page.$x('//*[@class="clear-all"]')
      await clearbutton[0].click(); 
      await page.waitForTimeout(10000);

    }
      console.log(details)

      await browser.close();

      fs.writeFile("bigbasketdetails.csv",JSON.stringify(details,'',2),(err) => {
        if(err){console.log(err)}
        else{console.log('Saved Successfully!')}
    });

  })()

}
    catch(e)
    {
        console.log("Error",e);
    }