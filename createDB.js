const { MongoClient } = require('mongodb');
// Подключаем модуль data.js
var data = require("./data.js").data;

// Выводим данные в консоль (как в задании)
console.log(data);

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'test2024';

async function main() {
    try {
        // Подключаемся к серверу
        await client.connect();
        console.log('Connected successfully to server');
        
        const db = client.db(dbName);
        const collection = db.collection('musicians'); // или documents

        // Вставляем данные из data.js
        console.log('Вставляем данные...');
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