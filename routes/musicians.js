var express = require('express');
var router = express.Router();
var Musician = require('../models/musician');

/* GET musicians listing. */
router.get('/', function(req, res, next) {
    res.send('Новый маршрутизатор, для маршрутов, начинающихся с musicians');
});

/* Страница музыкантов */
router.get("/:nick", async function(req, res, next) {
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