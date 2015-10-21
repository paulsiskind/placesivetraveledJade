var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/places')
var Places = db.get('places')

router.get('/', function(req, res, next){
  Places.find({}, function (err, data){
    res.render('index', {allPlaces: data})
  });
});

router.get('/new', function(req, res, next){
  res.render('new');
});

router.post('/', function(req, res, next){
  Places.insert({ address: req.body.address,
                  latitude: req.body.latitude,
                  longitude: req.body.logitude});
  res.render('new')
});

router.get('/:id', function(req, res, next){
  Places.findOne({_id: req.params.id}, function(err, data){
    res.render('show', {places: data});
  });
});

router.post('/:id/delete', function(req, res, next){
  Places.remove({_id: req.params.id}, function(err, data){
  });
});


module.exports = router;
