const express =require('express')
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const app=express()
const cors = require('cors')

const port = process.env.PORT || 5000;

// apXMfKwJVt6olfpc

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://todo-app:apXMfKwJVt6olfpc@cluster0.iodmc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

    await client.connect()
    const collection = client.db("test").collection("devices");
    try{
        app.post('/task', async(req,res)=>{
            const data = req.body
            console.log(data)
            const result = await collection.insertOne(data);
            res.send(result);
        })
        app.get('/task', async(req, res)=>{
            const quary = {}
            const cursor = collection.find(quary);
            const product = await cursor.toArray();
            res.send(product)
        })

        app.delete('/task/:_id', async(req, res)=>{
            const _id =req.params._id;
            // console.log(_id)
            const quary ={_id:ObjectId(_id)};
            const result = await collection.deleteOne(quary);
            res.send(result);
        })
    }
     finally{

    }
}
run().catch(console.dir())

app.get('/',(req, res)=>{
    res.send('connected')
})

app.listen(port,()=>{
    console.log('connected')
})