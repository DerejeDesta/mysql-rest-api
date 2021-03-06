var express = require('express');
var router = express.Router();
var db = require('../db');


router.get('/all', function(req, res, next) {
  db.query("select * from film", (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

router.get('/simple', function(req, res, next) {
  db.query("select film_id, title from film", (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

router.get('/rating/:rating', function(req, res, next) {
  var sqlQuery = "select * from film where rating=?";
  db.query(sqlQuery, [req.params.rating], (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});



router.post('/addFilm', function(req,res,next){
  var query = "INSERT INTO film (title, description, release_year, language_id,"
    +" rental_duration, rental_rate, length, replacement_cost, rating) "
    +"VALUES ( ?, ?, ?, ?, 3, 4.99, ?, 19.99, 'G');"
  var queryParams = [
    req.body.title,
    req.body.description,
    parseInt(req.body.release_year),
    parseInt(req.body.language_id),
    parseInt(req.body.length)
  ];

  db.query(query, queryParams, (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
    res.status(201).send('record added');
  });
});

router.get('/:id', function(req, res, next) {
  var sqlQuery = "select * from film where film_id=?";
  db.query(sqlQuery, [req.params.id], (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

module.exports = router;
