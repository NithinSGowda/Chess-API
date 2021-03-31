const jsChessEngine = require('js-chess-engine')
const game = new jsChessEngine.Game()
var express = require('express');
var multer = require('multer');
var upload = multer();
var app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 

app.post('/new', function(req, res){
    res.json(game.board.configuration);
});

app.post('/move', function(req, res){
    data = JSON.parse(JSON.stringify(req.body))    
    // res.json(data.config)
    game.move(data.move.src,data.move.dst,data.config)
    result = game.aiMove(0,data.config)
    response={}
    response["move"]=result
    response["board"]=game.board.configuration
    res.json(response);
});

app.post('/check', function(req, res){
    data = JSON.parse(JSON.stringify(req.body))    
    res.json(game.moves(data.move.pos,game.board.configuration));
});

app.listen(8080);