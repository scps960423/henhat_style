var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

console.log("load routes/posts.js");

/**
 * List all posts.
 * GET /api/posts
 */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    db.collection('post').find().toArray(function (err, result) {
      res.json({
        success: true,
        error: null,
        data: result
      });
    });
  });
});

router.post('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    db.collection('post').insertOne(req.body, function (err, result) {
      res.json({
        success: true,
        error: null,
        data: result
      });
    });
  });
});

router.get('/:id', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    db.collection('post').findOne({_id: new ObjectID(req.params.id)}, function (err, result) {
      res.json({
        success: true,
        error: null,
        data: result
      });
    });
  });
});

router.put('/:id', function(req, res, next) {
  console.log('put');
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    db.collection('post').updateOne({_id: new ObjectID(req.params.id)}, {$set: req.body}, function (err, result) {
      res.json({
        success: true,
        error: null,
        data: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    db.collection('post').deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
      res.json({
        success: true,
        error: null,
        data: result
      });
    });
  });
});

module.exports = router;
