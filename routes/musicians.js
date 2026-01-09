// routes/musicians.js
var express = require('express');
var router = express.Router();
var Musician = require('../models/musician');
var checkAuth = require("../middlewares/checkAuth.js");

/* GET musicians listing. */
router.get('/', function(req, res, next) {
    res.send('Новый маршрутизатор, для маршрутов, начинающихся с musicians');
});

/* Страница конкретного музыканта по никнейму */
router.get("/:nick", checkAuth, async function(req, res, next) {
   var musicians = await Musician.find({nick: req.params.nick});
   console.log(musicians)
   if(!musicians.length) return next(new Error("Нет такого музыканта"))
       var musician = musicians[0];
       res.render('musician', {
           title: musician.title,
           picture: musician.avatar,
           desc: musician.desc
       })
});

module.exports = router;