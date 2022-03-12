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
    const result = collection.insertMany(products);
    console.log(result);
    const brand = 'loom';
    const productsLoom = await collection.find({brand}).toArray();;
  
    console.log(productsLoom);
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());