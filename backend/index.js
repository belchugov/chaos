const serverless = require('serverless-http');
const express = require("express");
const ipfsAPI = require("ipfs-api");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const articles = "articles.txt";
const ipfs = ipfsAPI({
  host: "localhost",
  port: 5001,
  protocol: "http"
});

app.get("/", function(req, res) {
  fs.readFile(articles, "utf-8", (err, data) => {
    if (err) throw err;
    let ids = data
      .toString()
      .split(",")
      .filter(x => x != "");

    Promise.all(ids.map(i => getArticle(i)))
      .then(articles => {
        res.send(articles);
      })
      .catch(err => {
        res.send("Some error");
      });
  });
});

app.get("/post/:id", function(req, res) {
  getArticle(req.params.id).then(x => res.send(x));
});

app.post("/post", function(req, res) {
  let fileContent = { title: req.body.title, body: req.body.body };
  ipfs.files.add(Buffer.from(JSON.stringify(fileContent)), function(err, file) {
    if (err) throw err;

    fs.appendFile(articles, file[0].hash + ",", function(err) {
      if (err) throw err;
    });

    res.send(file);
  });
});

app.put("/post/:id", function(req, res) {
  res.send("updated")
});

const getArticle = id => {
  if (id) {
    return new Promise((resolve, reject) => {
      ipfs.files.get(id, (err, files) => {
        if (err) {
          reject("unable to find file");
        }
        files.forEach(file => {
          let content = JSON.parse(file.content.toString("utf8"));
          resolve({...content, id: id});
        });
      });
    });
  }
};

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports.handler = serverless(app);
