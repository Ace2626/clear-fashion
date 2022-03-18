const dedicatedbrand = require('./sources/montlimartbrand');
const fs = require('fs');

async function sandbox (eshop = 'https://www.montlimart.com/pulls-sweats.html') {
  try {
    
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    var products = await dedicatedbrand.scrape(eshop);
    

    console.log(products);  
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
