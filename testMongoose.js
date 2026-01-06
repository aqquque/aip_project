const mongoose = require('mongoose');

// Подключаемся к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/musicMongoose2024');

// Создаем схему
const musicianSchema = new mongoose.Schema({ 
    name: String,
    genre: String,
    activeYears: String,
    country: { type: String, default: 'USA' }
});

// Добавляем метод схемы (как в задании)
musicianSchema.methods.perform = function() {
    console.log(`${this.name} исполняет ${this.genre}`);
};

// Добавляем еще один метод
musicianSchema.methods.getInfo = function() {
    return `${this.name} - ${this.genre} (${this.activeYears})`;
};

// Создаем модель
const Musician = mongoose.model('Musician', musicianSchema);

// Создаем и сохраняем музыканта
async function saveMusician() {
    try {
        const lilpeep = new Musician({ 
            name: 'Lil Peep',
            genre: 'Emo Rap, Cloud Rap',
            activeYears: '2015-2017',
            country: 'USA'
        });
        
        // Сохраняем
        await lilpeep.save();
        console.log('✅ Музыкант сохранен');
        
        // Используем методы схемы
        lilpeep.perform(); // Вызов метода
        console.log(lilpeep.getInfo()); // Вызов другого метода
        
        // Создаем еще одного музыканта
        const darkPrince = new Musician({
            name: 'Тёмный принц',
            genre: 'Cloud Rap, Underground',
            activeYears: '2020-настоящее время',
            country: 'Russia'
        });
        
        await darkPrince.save();
        console.log('✅ Второй музыкант сохранен');
        darkPrince.perform();
        console.log(darkPrince.getInfo());
        
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
    } finally {
        mongoose.disconnect();
    }
}

saveMusician();