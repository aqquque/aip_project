const { MongoClient } = require('mongodb');
// Подключаем модуль data.js
var data = require("./data.js").data;

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name - изменяем на tc2024
const dbName = 'tc2024';

async function main() {
    try {
        // Подключаемся к серверу
        await client.connect();
        console.log('Connected successfully to server');
        
        const db = client.db(dbName);
        // Изменяем название коллекции на musicians
        const collection = db.collection('musicians');

        // Вставляем данные из data.js
        const insertResult = await collection.insertMany(data);
        console.log('Inserted documents =>', insertResult);

        return 'done.';
    } catch (error) {
        console.error('Error:', error);
        return 'error';
    } finally {
        await client.close();
    }
}

main()
    .then(console.log)
    .catch(console.error);