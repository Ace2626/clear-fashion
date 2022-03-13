/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const fs = require('fs');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/t-shirts') {
  try {
    
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    var products = await dedicatedbrand.scrape(eshop);
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/sweats'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/knitwear'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/shirts'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/bottoms'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/jackets'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/caps-and-beanies'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/socks'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/underwear'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/swim-shorts'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/tote-bags'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/t-shirts-and-tops'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/basics'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/sweats'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/knitwear'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/dresses'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/shirts'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/bottoms'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/jackets'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/caps-and-beanies'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/socks'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/underwear'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/swimwear'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/women/tote-bags'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/kids/t-shirts'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/kids/sweatshirts'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/kids/bottoms'))
    products=products.concat(await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/kids/swimwear'))

    
    products.forEach(element => {
      element['brand']='Dedicated'
    });
    console.log(products);  
    console.log('done');
    const data = JSON.stringify(products);
    fs.writeFileSync('products.json', data, (err) => {
      console.log("a")
        if (err) {
            console.log(err)
            throw err;
            
        }
        console.log("JSON data is saved.");
    });
    process.exit(0);
   
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);




