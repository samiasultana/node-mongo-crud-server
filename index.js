const express = require('express');
const { MongoClient, CURSOR_FLAGS } = require('mongodb');
const cors = require('cors');
// app delete import
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// CORS from Middleware from Resources from expressjs
app.use(cors());
app.use(express.json());


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

    // Get API
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    })

    // POST API
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      console.log("got a new user", req.body);
      console.log("added user", result);
      // res.send('POST request to the homepage')
      res.json(result);
    });

    // DELETE API
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      // delete
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query); 
      console.log("deleted", result);
      res.json(result);
    })
  }
  finally {
    // await client.close();
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