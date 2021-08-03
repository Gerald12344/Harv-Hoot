const https = require('https');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const Ddos = require('ddos');
const fs = require('fs');
var httpolyglot = require('httpolyglot');

let login = require("./server/login/login.js");
let game = require("./server/game/game.js");
let database = require("./server/game/database.js");
let admin = require("./server/admin/admin.js");
//--------------------------------------
let ddos = new Ddos({burst:10, limit:15});

app.use(ddos.express);

const privateKey = fs.readFileSync('/etc/letsencrypt/live/harvhoot.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/harvhoot.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/harvhoot.com/chain.pem', 'utf8');


const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
const server = httpolyglot.createServer(credentials, app);
app.use(function(req, res, next) {
    if (!req.secure ) {
            res.redirect (301, 'https://harvhoot.com');
    }
    requestHandler(req, res);
    next();
})

function requestHandler(req, res) {
    res.setHeader('X-XSS-Protection','1;mode=block');
    res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload');
    res.setHeader('Cache-Control','no-cache,no-store,max-age=0,must-revalidate');
    res.setHeader('Pragma','no-cache');
    res.setHeader('Expires','-1');
    res.setHeader('X-Frame-Options','SAMEORIGIN');
    res.setHeader('X-Content-Type-Options','nosniff');

}

//const server = http.createServer( app);
app.use(express.static(`client`));
console.log('started');
const io = socketio(server);
console.log('running')

app.use('/', express.static(__dirname + '/play/music'));


io.on('connection', (sock) => {
  //conection
  io.emit('console', login.console('Join: ' + sock.id, sock))
  //--------------------------------------

  //homepage requests
  sock.on('searchbar', (data) => {
    database.Search(data, sock)
  })
  sock.on('trending-now', (data) => {
    database.Trending(sock)
  });
  sock.on('homepage-query(send)specific', (data) => {
    database.homepageQuerySpecific(sock, data)
  });
  sock.on('homepage-query(send)', (data) => {
    database.homepageQuery(sock)
  });
  //--------------------------------------


  //game login
  sock.on('kicked', (data) => {
    console.log(`kicked ${data.id} from ${data.pin}`)
    io.to(data.id).emit('removed',`${data.text}`)
    
  })

  sock.on('name', (data) => {
    console.log(data)
    sock.join(data.Pin)
    data.Id = sock.id
    io.to(data.Pin).emit('new-member', data);
  })

  //game requests
  sock.on('request', (text) => {
    let join = login.newRequest(sock, text, io);
    if (!join[0]) {
      sock.emit('requests-recieve', 'nope')
    } else {
      sock.emit('requests-recieve', 'yep')
    }
  });
  //------------------------------------
//Handeling temperature and fan controlls
  sock.on('Admin-Panel-Login', (data) => {
    admin.login(sock, io, data.username2, data.password)
  })
  sock.on('Admin-Panel-Data', (data) => {
    admin.data(sock, io, data)
  })

  //game
  sock.on('question-picture', (data) => {
    console.log('data: ' + data)
    io.emit('question-picture-recieve', data)
  })

  //Create New game
  sock.on('game-creation', (mongoId) => {
    let state = game.newGame(sock, mongoId, io);
    console.log(state)
    sock.emit('new-pin-host', state);
  });

  //start Game currently does nothing
  sock.on('start', (state) => {
    let id = game.ChangeState((sock, state, io))
    io.in(id).emit('start', 'state');
  });

  //question answers does nothing
  sock.on('question-answer', (state) => {
    let gameAnswer = game.Answer(sock.id, sock, io)
    io.in(gameAnswer[1]).emit('answer', gameAnswer[0]);
  });


  sock.on('answer', (state) => {
    let answered = game.Answered(sock.id, sock, io, state)
    io.to(answered[1]).emit('answerScore', answered);
  });

  //Disconnection-------------------------------
  sock.on('disconnect', function () {
    admin.disconnect(sock,io);
    login.disconnect(sock, io);
  });
  //---------------------------------------------
});
server.on('error', (err) => {
  console.error('Server error:', err);
});
server.listen(8000, () => {
  console.log('RPS started on 8080');
});
