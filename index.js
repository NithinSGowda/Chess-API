const jsChessEngine = require('js-chess-engine')
const game = new jsChessEngine.Game()
var express = require('express');
var multer = require('multer');
var upload = multer();
var app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 
const uri = "mongodb+srv://stockapp:88888888@cluster0.o8iuu.mongodb.net/chessapi?authSource=admin&replicaSet=atlas-yebdcz-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
const mongoose = require('mongoose');
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
    console.log('Connected')
}).catch(err => console.log(err))
const schemaaa={
    "fullMove": {
      "type": "Number"
    },
    "halfMove": {
      "type": "Number"
    },
    "enPassant": {
      "type": "Mixed"
    },
    "isFinished": {
      "type": "Boolean"
    },
    "checkMate": {
      "type": "Boolean"
    },
    "check": {
      "type": "Boolean"
    },
    "turn": {
      "type": "String"
    },
    "pieces": {
      "E1": {
        "type": "String"
      },
      "D1": {
        "type": "String"
      },
      "A1": {
        "type": "String"
      },
      "H1": {
        "type": "String"
      },
      "C1": {
        "type": "String"
      },
      "F1": {
        "type": "String"
      },
      "B1": {
        "type": "String"
      },
      "G1": {
        "type": "String"
      },
      "A2": {
        "type": "String"
      },
      "B2": {
        "type": "String"
      },
      "C2": {
        "type": "String"
      },
      "D2": {
        "type": "String"
      },
      "E2": {
        "type": "String"
      },
      "F2": {
        "type": "String"
      },
      "G2": {
        "type": "String"
      },
      "H2": {
        "type": "String"
      },
      "E8": {
        "type": "String"
      },
      "D8": {
        "type": "String"
      },
      "A8": {
        "type": "String"
      },
      "H8": {
        "type": "String"
      },
      "C8": {
        "type": "String"
      },
      "F8": {
        "type": "String"
      },
      "B8": {
        "type": "String"
      },
      "G8": {
        "type": "String"
      },
      "A7": {
        "type": "String"
      },
      "B7": {
        "type": "String"
      },
      "C7": {
        "type": "String"
      },
      "D7": {
        "type": "String"
      },
      "E7": {
        "type": "String"
      },
      "F7": {
        "type": "String"
      },
      "G7": {
        "type": "String"
      },
      "H7": {
        "type": "String"
      }
    },
    "castling": {
      "whiteShort": {
        "type": "Boolean"
      },
      "blackShort": {
        "type": "Boolean"
      },
      "whiteLong": {
        "type": "Boolean"
      },
      "blackLong": {
        "type": "Boolean"
      }
    }
}
const config = new mongoose.Schema(schemaaa,{timestamps: true});
const chessAI = mongoose.model('data', config);

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
    chessAI.create(game.board.configuration, function (err, obj2) {
        if (err)
            console.log(err);
        console.log(obj2)
    });
    res.json(response);
});

app.post('/check', function(req, res){
    data = JSON.parse(JSON.stringify(req.body))    
    res.json(game.moves(data.move.pos,game.board.configuration));
});

app.listen(8080);