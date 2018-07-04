const mongoose = require('mongoose'),
      userPlayList = require('./userPlaylist'),
      bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    playlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userPlaylist'
        }
    ]
})

userSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10).then(function(hashedPassword) {
        user.password = hashedPassword;
        next();
    }, function(err) {
        return next(err);
    });
});

userSchema.methods.comparePassword = function(password, next) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if(err) return next(err);
        return next(null, isMatch);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;