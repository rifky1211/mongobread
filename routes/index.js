var express = require("express");
var router = express.Router();
var moment = require("moment"); // require
const { ObjectID } = require("mongodb");

module.exports = function (use) {
  const dbName = "batch25";
  const db = use.db(dbName);
  const page = 1;
  router.get("/", function (req, res, next) {
      // db.collection('c21').find().count()
      // .then(
      //   res => console.log(`${res.result.n}`),
      //   err => console.log(err),
      // )
  var page = parseInt(req.query.page) || 1;
  var size = 2;
  var skip = (page - 1) * size;
  let stringdata = req.query.string
  let integerdata = parseInt(req.query.integer);
  let floatdata = parseFloat(req.query.float);
  let start = req.query.start;
  let end = req.query.end;
  let booleandata = req.query.boolean;
  if(page){
    db.collection("c21")
    .find()
    .limit(size)
    .skip(skip)
    .toArray((err, result) => {
      jumlahData = result.length;
      jumlahHalaman = Math.ceil(jumlahData / 2)
      db.collection("c21")
        .find()
        .limit(size)
        .skip(skip)
        .toArray((err, result) => {
          res.render("index", {data: result, moment: moment});

        });
    });
  }

    db.collection("c21")
      .find()
      .toArray((err, result) => {
        jumlahData = result.length;
        jumlahHalaman = Math.ceil(jumlahData / 2)
        db.collection("c21")
          .find()
          .toArray((err, result) => {
            res.render("index", {data: result, moment: moment});

          });
      });
  });

  router.get("/add", (req, res) => {
    res.render("add");
  });

  router.post("/add", (req, res) => {
    db.getCollection("c21").insertOne(
      {
        stringdata: `${req.body.string}`,
        integerdata: `${req.body.integer}`,
        floatdata: `${req.body.float}`,
        datedata: `'${req.body.date}'`,
        booleandata: `${req.body.boolean}`,
      },
      res.redirect("/")
    );
  });

  router.get("/delete/:id", (req, res) => {
    let index = req.params.id;
    db.collection("c21").deleteOne(
      {
        _id: ObjectID(`${index}`),
      },
      res.redirect("/")
    );
  });

  router.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    db.collection("c21")
      .find({ _id: ObjectID(`${index}`) })
      .toArray((error, result) => {
        res.render("edit", { data: result, moment: moment });
      });
  });

  router.post("/edit/:id", (req, res) => {
    let index = req.params.id;

    db.collection("c21").updateOne(
      {
        _id: ObjectID(`${index}`),
      },
      {
        $set: {
          stringdata: `${req.body.string}`,
          integerdata: `${req.body.integer}`,
          floatdata: `${req.body.float}`,
          datedata: `'${req.body.date}'`,
          booleandata: `${req.body.boolean}`,
        },
      },
      res.redirect("/")
    );
  });

  return router;
};
