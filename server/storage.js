const fs = require('fs');

const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://<AntoineS>:<mStarWars911>@<cluster-url>?retryWrites=true&writeConcern=majority';
const MONGODB_DB_NAME = 'Cluster0';

//const client = MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
//const db =  client.db(MONGODB_DB_NAME)
MongoClient.connect(MONGODB_URI, (error, client) => {
    const db =  client.db(MONGODB_DB_NAME)
    const products = JSON.parse(fs.readFileSync('products.json'));
    const collection = db.collection('products');
    const result = collection.insertMany(products)
    console.log(result);})




