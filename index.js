const   express        = require('express'),
        app            = express(),
        mongoose       = require('mongoose'),
        bodyParser     = require('body-parser')
        db             = require('./models'),
        trendingRoutes = require('./routes/trending'),
        playlistRoutes = require('./routes/playlist'),
        authRoutes     = require('./routes/auth'),
        userPlaylist   = require('./routes/userplaylist');      
const PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api/', function(req,res){
    console.log('Got a request...');
    res.send('This the response!!')
})

app.use('/api/trending', trendingRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/', authRoutes);
app.use('/api/', userPlaylist);

app.listen(PORT, function(){
    console.log(`The server is running on http://localhost:${PORT}`);
})
