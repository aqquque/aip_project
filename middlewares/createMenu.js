// middlewares/createMenu.js
var Musician = require("../models/musician");

module.exports = async function(req, res, next) {
  // Инициализируем пустой массив для навигации
  res.locals.nav = [];
  
  try {
    // Получаем список музыкантов для меню (только title и nick)
    var menu = await Musician.find({}, { _id: 0, title: 1, nick: 1 });
    console.log("Меню музыкантов:", menu);
    
    if (menu.length !== 0) {
      res.locals.nav = menu;
    }
  } catch (error) {
    console.error("Ошибка при загрузке меню:", error);
  }
  
  next();
};