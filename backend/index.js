const express = require("express");
const fileUpload = require("express-fileupload");
const ipfsAPI = require("ipfs-api");
const fs = require("fs");
const faker = require("faker");

const app = express();
app.use(fileUpload());

const port = 3000;
const ipfs = ipfsAPI({
  host: "localhost",
  port: 5001,
  protocol: "http"
});

app.get("/post/:id", function(req, res) {
  ipfs.files.get(req.params.id, (err, files) => {
    if (err) {
      res.send("Unable to find file");
    }
    files.forEach(file => {
      res.send(file.content.toString("utf8"));
    });
  });
});

app.post("/post", function(req, res) {
  let buffer = Buffer.from(req.files.article.data)
  ipfs.files.add(buffer, function(err, file) {
    if (err) {
      console.log(err);
    }
    res.send(file);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getFakePosts(number) {
  let array = [];
  for (let i = 0; i < number; i++) {
    array.push({
      title: faker.lorem.word(),
      body: faker.lorem.paragraph(),
      date: faker.date.recent(10)
    });
  }

  return array;
}
