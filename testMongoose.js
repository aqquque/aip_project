// testMongoose.js - упрощенная версия
const mongoose = require('mongoose');

// Подключаемся к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/musicMongoose2024');

// Импортируем модель
const Musician = require('./models/musician');

// Простой тест
async function simpleTest() {
    console.log('🎵 Простой тест модели Musician\n');
    
    try {
        // 1. Очищаем коллекцию
        await Musician.deleteMany({});
        console.log('✅ Коллекция очищена');
        
        // 2. Создаем первого музыканта
        const lilpeep = new Musician({
            title: 'Lil Peep',
            nick: 'lilpeep',
            avatar: '/images/lilpeep-1.jpg',
            desc: 'Американский рэп-певец, символ эмоциональной уязвимости.',
            genre: ['Emo Rap', 'Cloud Rap'],
            activeYears: '2015-2017',
            country: 'USA'
        });
        
        await lilpeep.save();
        console.log('✅ Lil Peep сохранен');
        console.log('   ID:', lilpeep._id);
        console.log('   Инфо:', lilpeep.getInfo());
        
        // 3. Создаем второго музыканта
        const musician2 = new Musician({
            title: '2hollis',
            nick: '2hollis',
            desc: 'Американский мультиинструменталист.',
            genre: ['Hyperpop'],
            activeYears: '2019-настоящее время'
        });
        
        await musician2.save();
        console.log('\n✅ 2hollis сохранен');
        
        // 4. Проверяем количество
        const count = await Musician.countDocuments();
        console.log(`\n📊 Всего музыкантов: ${count}`);
        
        // 5. Находим всех
        const all = await Musician.find({});
        console.log('\n🎵 Все музыканты:');
        all.forEach(m => console.log(`   - ${m.title} (@${m.nick})`));
        
    } catch (error) {
        console.error('\n❌ Ошибка:', error.message);
        console.error('Детали:', error);
        
        // Проверяем тип ошибки
        if (error.name === 'ValidationError') {
            console.log('\n🔍 Ошибки валидации:');
            for (const field in error.errors) {
                console.log(`   ${field}: ${error.errors[field].message}`);
            }
        }
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Соединение закрыто');
    }
}

simpleTest();