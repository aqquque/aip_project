// routes/musicians.js
var express = require('express');
var router = express.Router();

/* GET musicians listing. */
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор для маршрутов, начинающихся с musicians');
});

/* Страница конкретного музыканта по никнейму */
router.get('/:nick', function(req, res, next) {
  // Отображаем полученный параметр
  res.send(`${req.params.nick}`);
});

module.exports = router;