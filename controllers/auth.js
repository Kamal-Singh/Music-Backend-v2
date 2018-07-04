var db = require('../models');
var jwt = require('jsonwebtoken');
const SECRET_KEY = 'i dont know what to keep as my secret key!!!!'
exports.signup = function(req,res,next) {
    db.User.create(req.body).then(function(user){
        var token = jwt.sign({userId: user.id}, process.env.SECRET_KEY || SECRET_KEY);
        var message='New User Created!!';
        var favourite_id;
        db.userPlaylist.create({name: 'Favourites', songs: []}).then(function(favourite){
            favourite_id = favourite.id;
            user.playlist.push(favourite);
            user.save(function(err,savedPlaylist){
                if(err)
                {
                    message = 'Unable to create new playlist!!!';
                }
            })
        }).then(function(){
                res.status(200).json({
                userId: user.id,
                username: user.username,
                playlist: favourite_id,
                message: message,
                token
            });
        });
        }).catch(function(err){
            res.status(400).json(err);
        });
}

exports.signin = function(req,res,next) {
    db.User.findOne({ email: req.body.email }).then(function(user) {
        user.comparePassword(req.body.password, function(err, isMatch){
            console.log("Enviornment key=" + process.env.SECRET_KEY || SECRET_KEY);
            if(isMatch) {
                var token = jwt.sign({userId: user.id}, process.env.SECRET_KEY || SECRET_KEY);
                res.status(200).json({
                    userId: user.id,
                    username: user.username,
                    playlist: user.playlist,
                    token
                });
            } else {
                res.status(400).json({
                    message: 'Invalid email-Id/Password'
                });
            }
        });
    }).catch(function(err) {
        res.status(400).json(err);
    });
};

module.exports = exports;