const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//middle ware
app.use(bodyParser.json());
app.use(cors());

const tasklist = require("../api/tasklist");

app.use("/api/tasklist", tasklist);

//handle prouction
if (process.env.NODE_ENV === "production") {
  //static fider
  app.use(express.static(__dirname + "/public"));

  //handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
