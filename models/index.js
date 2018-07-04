const mongoose = require('mongoose')
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MusicApp');
module.exports.PlayList = require('./playlist');
module.exports.Song = require('./song');
module.exports.User = require('./auth');
module.exports.userPlaylist = require('./userPlaylist');