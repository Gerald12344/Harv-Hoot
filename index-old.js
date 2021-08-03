const http = require('http');
const https = require('https');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const app2 = express();
const fs = require('fs');
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

let login = require("./server/login/login.js");
let game = require("./server/game/game.js");
let database = require("./server/game/database.js");

//--------------------------------------
var privateKey = fs.readFileSync('path/private.key' );
var certificate = fs.readFileSync('path/harvhoot.com.crt' );

app.use(express.static(`client`),redirectToHTTPS());
console.log('started');
const server = https.createServer({
    key: privateKey,
    cert: certificate
}, app);
app2.use(express.static(`client`));
const server2 = http.createServer(app2);;
const io = socketio(server);
console.log('running')


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
    login.disconnect(sock, io);
  });
  //---------------------------------------------
});
server.on('error', (err) => {
  console.error('Server error:', err);
});
server.listen(8080, () => {
  console.log('RPS started on 8080');
});
server2.on('error', (err) => {
console.error('server 2 error:', err);
});
server2.listen(8000, () => {
console.log('http server pn port 8000');
});
