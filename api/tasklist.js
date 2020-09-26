const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//get task
router.get("/", async (req, res) => {
  const tasks = await loadTasksCollection();

  res.send(await tasks.find({}).toArray());
});

//add task
router.post("/", async (req, res) => {
  const tasks = await loadTasksCollection();

  await tasks.insertOne({
    task: req.body.text,
    dateCreated: new Date(),
  });

  res.status(201).send();
});

//delete task
router.delete("/:id", async (req, res) => {
  const tasks = await loadTasksCollection();

  await tasks.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

//connecting to database
async function loadTasksCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://ivlayhort:1234@ivlayhort-cloud-db.fklrp.mongodb.net/my_tasklist?retryWrites=true&w=majority",
    { useNewUrlParser: true } 
  );

  return client.db("my_tasklist").collection("mytasks");
}

module.exports = router;
