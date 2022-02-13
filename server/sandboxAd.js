const dedicatedbrand = require('./sources/adresseParisbrand');

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
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
