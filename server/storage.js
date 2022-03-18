const { MongoClient } = require('mongodb');
const fs = require('fs');



const MONGODB_URI = 'mongodb+srv://AntoineS:mStarWars911@cluster0.twud3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(MONGODB_URI);
console.log(MONGODB_URI)
const dbName = 'Cluster0';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const products = JSON.parse(fs.readFileSync('products.json'));
    const collection = db.collection('products');
    //const result =await collection.insertMany(products);
    //console.log(result);
    await brand(collection,'Dedicated');
    //await maxPrice(collection,10);
    //await sortPrice(collection);
    client.close();

  }

main()
  .then(console.log)
  .catch(console.error);


async function brand(collection,brand){
  const prod = await collection.find({brand}).toArray();

    console.log(prod);
    
  };

async function maxPrice(collection,p){
  const prod = await collection.find({price: { $lt: p } }).toArray();
  console.log(prod);
};

async function sortPrice(collection){
  const prod = await collection.find().sort({price:1});
  console.log(prod);
}
  