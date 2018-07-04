const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      db = require('../models');

router.get('/userplaylist/:id', function(req, res){
    let id = req.params.id;
    db.userPlaylist.findById(id).populate('songs').exec(function(err, playlist){
        if(err) {
            res.status(500).json({
                message: 'Unable to reterive playlist!!!'
            })
        } else {
            res.status(200).json(playlist);
        }
    });
});
router.post('/userplaylist/:id', function(req, res){
    let id = req.params.id;
    db.userPlaylist.findById(id).then(function(playlist){
        playlist.songs.push(req.body);
        playlist.save().then(function(updatedPlaylist){
            console.log(updatedPlaylist);
            res.json(updatedPlaylist.populate('songs'));
        }).catch(err)
        {
            res.status(500).json({
                message: 'Unable to add song to the playlist!!',
                err
            })
        };
    });
});

module.exports = router;
