const IPFS = require("ipfs");
const faker = require("faker");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res) {
  res.send(getFakePosts(3));
});

app.get("/post", function(req, res) {
  res.send(getFakePosts(1)[0]);
});

app.post("/post", function(req, res) {
  res.send("Got a POST request");
});

app.delete("/post", function(req, res) {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getFakePosts(number) {
  let array = [];
  for (let i = 0; i < number; i++) {
    array.push({
      title: faker.lorem.word(),
      body: faker.lorem.paragraphs(),
      date: faker.date.recent(10)
    });
  }

  return array;
}
