// models/musician_simple.js (временный файл)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicianSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Название обязательно'],
        trim: true
    },
    nick: {
        type: String,
        unique: true,
        required: [true, 'Никнейм обязателен'],
        trim: true,
        lowercase: true
    },
    avatar: {
        type: String,
        default: '/images/default-avatar.jpg'
    },
    desc: {
        type: String,
        required: [true, 'Описание обязательно'],
        minlength: [10, 'Описание должно содержать минимум 10 символов']
    },
    genre: {
        type: [String],
        default: []
    },
    activeYears: String,
    country: {
        type: String,
        default: 'USA'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Без middleware пока что
// musicianSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// });

musicianSchema.methods.getInfo = function() {
    return `${this.title} (${this.nick})`;
};

module.exports = mongoose.model('Musician', musicianSchema);