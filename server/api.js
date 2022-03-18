const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const { find } = require('domutils');

async function main(){
const MONGODB_URI = 'mongodb+srv://AntoineS:mStarWars911@cluster0.twud3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(MONGODB_URI);
await client.connect();
console.log('Connected successfully to server');
const db = client.db('Cluster0');
const collection = db.collection('products');
result=await collection.find({}).toArray();
console.log(result)
return result;
}
 //var result=main();
 //console.log(result)

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/',(request,response)=>{
  response.send({'ack':true});
})

app.get('/products',async(req,res)=>{
  const MONGODB_URI = 'mongodb+srv://AntoineS:mStarWars911@cluster0.twud3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db('Cluster0');
  const collection = db.collection('products');
  result=await collection.find({}).toArray();
  console.log(result.length);
  res.send(result);
})

app.get('/products/search', async(request, response) => {
  const MONGODB_URI = 'mongodb+srv://AntoineS:mStarWars911@cluster0.twud3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db('Cluster0');
  const collection = db.collection('products')
  var queryMG={};
  const limit=parseInt(request.query.limit);
  const brand=request.query.brand;
  const price=parseInt(request.query.price);
  console.log(limit,brand,price)
  if(brand!=undefined){
    console.log('brand')
    queryMG['brand']=brand; 
  }
  if(isNaN(price)==false){
    console.log('price')
    queryMG['price']={$lt:price};
  }
  if(isNaN(limit)==false){
    console.log('limit')
    res=await collection.aggregate(queryMG).limit(limit);
  }
  else{
    console.log(queryMG)
    res=await collection.find(queryMG).toArray();
  }
  console.log(queryMG)
  console.log(res.lenght);
  response.send(res);
})





app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

// Use connect method to connect to the server
