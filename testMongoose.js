const mongoose = require('mongoose');

// Подключаемся к базе данных (изменяем название на musicMongoose2024)
mongoose.connect('mongodb://127.0.0.1:27017/musicMongoose2024');

// Создаем модель Музыканта (Musician)
const Musician = mongoose.model('Musician', { 
    name: String,
    genre: String,
    activeYears: String
});

// Создаем экземпляр модели
const lilpeep = new Musician({ 
    name: 'Lil Peep',
    genre: 'Emo Rap, Cloud Rap',
    activeYears: '2015-2017'
});

// Сохраняем в базу данных
lilpeep.save()
    .then(() => console.log('✅ Музыкант Lil Peep сохранен в базу данных'))
    .catch(err => console.error('❌ Ошибка при сохранении:', err));