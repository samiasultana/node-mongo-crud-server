const express = require('express');
const { MongoClient } = require('mongodb');

var cors = require('cors');
const app = express();

// CORS from Middleware from Resources from expressjs
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

//mongodb user id: mydbuser1, pass: TBJZUIgZ9bB7UAan


const uri = "mongodb+srv://mydbuser1:TBJZUIgZ9bB7UAan@cluster0.zyodo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// either-------------------------------------------------------------------------
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("Hitting it");
//   //   console.error(err);

//   const user = { name: "Babuni", job: "Being Cutie Pie", email: "dumpa.com" };
//   collection.insertOne(user)
//     .then(() => {
//       console.log("Meawwwwwwwwwwww");
//     })
//   // perform actions on the collection object
//   //   client.close();
// });

// -------------------------------------------------------------------------------
// or-----------------------------------------------------------------------------

async function run() {
  try {
    await client.connect();
    const database = client.db("insertDB");
    const usersCollection = database.collection("users");
    // create a document to insert
    // const doc = {
    //   Name: "Babuni ta",
    //   Job: "Being Cute",
    // }
    // const result = await usersCollection.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // POST API
    app.post('/users', async (req, res) => {
      console.log("Hitting the post", req.body)
      res.send('POST request to the homepage')
    })
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
// ---------------------------------------------------------------------------------



app.get('/', (req, res) => {
  res.send('Hello World! I am running my CRUD server yoo!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})