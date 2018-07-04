'use-strict'
const mongoose = require('mongoose'),
      db       = require('../models'),
      express  = require('express'),
      router   = express.Router()

router.post('/', function(req,res){
    db.Song.create(req.body, function(err, song){
        if(err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            res.json(song);
        }
    });
})

module.exports = router;