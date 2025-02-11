const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const { find } = require('domutils');
const { calculateLimitAndOffset, paginate } = require('paginate-info')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());






app.get('/',async(request,response)=>{
  const MONGODB_URI = 'mongodb+srv://AntoineS:mStarWars911@cluster0.twud3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db('Cluster0');
  const collection = db.collection('products');
  var page=parseInt(request.query.page);
  var size=parseInt(request.query.size);
  if(isNaN(page))
    page==1;
  if(isNaN(size))
    size=12;
  result=await collection.find({}).toArray();
  const count = Object.keys(result).length;
  const { limit, offset } = calculateLimitAndOffset(page, size);
  const rows = await collection.find({})
    .skip(offset)
    .limit(limit).toArray();
  const meta = paginate(page, count, rows, size);
  //console.log(rows)
  console.log(count)
  response.send({'success':true,"data":{"result":rows,
  "meta":meta}});
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
  
  console.log(queryMG)
  res1=await collection.find(queryMG).toArray();

  if(isNaN(limit)==false){
    console.log('limit')
    res=[]
    for(let i=0; i<limit;i++){
      res.push(res1[i]);
    }
    res1=res;
  }
  res1.sort(
    (first, second) => { return first['price'] - second['price'] }
  );
  res=res1
  console.log(queryMG)
  console.log(res.lenght);
  response.send(res);
})

module.exports=app;





app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

// Use connect method to connect to the server
