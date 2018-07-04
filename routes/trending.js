'use-strict'
const   express = require('express')
        router = express.Router()
        mongoose = require('mongoose')
        db = require('../models')

router.get('/', function(req,res){
    db.Song.find().sort({'listened': 'descending'}).limit(10).exec(function(err, songs){
        if(err)
        {
            res.status(500).send(err);
        } else {
            res.json(songs);
        }
    })
})

module.exports = router;