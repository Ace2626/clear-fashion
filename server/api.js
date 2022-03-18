const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { MongoClient } = require('mongodb');
const fs = require('fs');

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
 var result=main();
 console.log(result)

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
  console.log(result.length);
  res.send(result);
})

app.get('/products/search', async(request, response) => {
  var queryMG={};
  const limit=parseInt(repuest.query.limit);
  const brand=request.query.brand;
  const price=parseInt(request.query.price);
  if(brand!==undefined){
    queryMG['brand']=brand; 
  }
  if(price!==undefined){
    queryMG['price']={$lt:price};
  }
  if(limit!==undefined){
    result=await db.aggregate(queryMG).limit(limit);
  }
  else{
    result=await db.find(queryMG);
  }
  console.log(result.lenght);
  response.send(result);
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

// Use connect method to connect to the server
