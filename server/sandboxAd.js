const dedicatedbrand = require('./sources/adresseParisbrand');
const fs = require('fs');

async function sandbox (eshop = 'https://adresse.paris/608-pulls-et-sweatshirts') {
  try {
    
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    var products = await dedicatedbrand.scrape(eshop);
    products=products.concat(await dedicatedbrand.scrape('https://adresse.paris/583-manteaux-et-blousons'))
    products=products.concat(await dedicatedbrand.scrape('https://adresse.paris/610-pantalons'))
    products=products.concat(await dedicatedbrand.scrape('https://adresse.paris/584-chemises'))
    products=products.concat(await dedicatedbrand.scrape('https://adresse.paris/659-t-shirts-et-polos'))
    products=products.concat(await dedicatedbrand.scrape('https://adresse.paris/580-accessoires'))


    console.log(products);  
    console.log('done');
    const data = JSON.stringify(products);
    fs.appendFileSync('products.json', data, (err) => {
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
