var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    if (err) throw err;

    db.collection('post').find().toArray(function (err, result) {
      if (err) throw err;
      res.render('index', { title: 'Express', posts: result });
    });
  });
});

router.get('/show-:id', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    if (err) throw err;

    db.collection('post').findOne({_id: new ObjectID(req.params.id)})
    .then(function(result) {
      res.render('show', { title: result.title, post: result });
    });
  });
});

router.get('/create', function(req, res, next) {
  res.render('create', {});
});

router.get('/buy', function(req, res, next) {
  res.render('buy', {});
});

router.get('/buy-:id', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    db.collection('post').findOne({_id: new ObjectID(req.params.id)})
    .then(function(result) {
      res.render('buy', { post: result });
    });
  });
});

router.get('/edit-:id', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    db.collection('post').findOne({_id: new ObjectID(req.params.id)})
    .then(function(result) {
      res.render('edit', { post: result });
    });
  });
});

module.exports = router;
