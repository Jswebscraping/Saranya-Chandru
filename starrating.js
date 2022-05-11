const puppeteer = require('puppeteer');
try{
(async () => {
     
     const browser = await puppeteer.launch({headless:false})
     const page = await browser.newPage()
    // await page.setViewport({ width: 1280, height: 800 })
     const star=['https://www.chemistwarehouse.co.nz/buy/101750/essie-nail-polish-ballet-slippers-6','https://www.chemistwarehouse.co.nz/buy/83446/dermal-therapy-anti-itch-soothing-cream-85g','https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml'];
     for(let i=0;i<star.length;i++){
     try{
     await page.goto(star[i],{waitUntil:'load'});
     await page.waitForTimeout(10000);
     const check=await page.$x('//*[@id="BVRRContainer"]//*[@class="bv-write-review-container bv-write-container"]/button');
     await check[0].hover();
     //await page.waitForXPath('//*[@class="bv-secondary-rating-summary-rating bv-table-cell"]')
     var ballet= await page.$x('//*[@id="BVRRContainer"]//*[@class="bv-secondary-rating-summary-rating bv-table-cell"]');
     let ratingofcream = await page.evaluate(el => el.textContent, ballet[0]);
     console.log(ratingofcream);
     }
     catch(e){
         console.log("rating not visible")
     }
    }
    
     await browser.close();
})();
}

catch(e)
{
    console.log("Error",e);
}
