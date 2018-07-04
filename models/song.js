'use strict'
const   mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    name: { type: String, required: true },
    album: String,
    singer: String,
    link: { type: String, required: true },
    albumArt: String,
    listened: { type: Number, default: 0 }
});

module.exports = mongoose.model('song', Schema);