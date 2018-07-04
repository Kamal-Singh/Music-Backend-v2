const mongoose = require('mongoose'),
      songModel = require('./song');

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'song'
        }
    ]
})

module.exports = mongoose.model('userPlaylist', Schema);