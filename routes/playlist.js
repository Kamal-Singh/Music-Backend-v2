const mongoose = require('mongoose'),
      db = require('../models')
      express = require('express'),
      router = express.Router()

router.get('/', function(req, res){
    db.PlayList.find(function(err, playlist){
        if(err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            let obj = [];
            playlist.forEach((o) =>{
                let new_object = {};
                new_object['_id'] = o['_id'];
                new_object['name'] = o['name'];
                new_object['image'] = o['image'];
                obj.push(new_object);
            })
            res.send(obj);
        }
    });
})

router.post('/', function(req, res){
    db.PlayList.create(req.body, function(err, playlist){
        if(err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            let obj = {};
            obj['name'] = playlist['name'];
            res.send(obj);
        }
    })
})

router.get('/:id', function(req, res){
    let id = req.params.id;
    db.PlayList.findById(id).populate('songs').exec(function(err, playlist){
        res.json(playlist);
    })
})

module.exports = router;