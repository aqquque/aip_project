var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/lilpeep', function(req, res, next) {
    res.send("<h1>Страница Lil peep</h1>")
});
router.get('/2hollis', function(req, res, next) {
    res.send("<h1>Страница 2hollis</h1>")
});
router.get('/temniy-princ', function(req, res, next) {
    res.send("<h1>Страница Тёмный принц</h1>")
});

module.exports = router;
