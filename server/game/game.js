let addServer = require('../login/login.js');
let database = require('./database.js')
let users = [];


function dateGet(message, sock) {
  var d = new Date();
  let array = []
  array.push(d.getHours() + ':' + d.getMinutes() + '  ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ': ' + message)
  array.push(sock.id)
  return array
}

let currentPin = []

function generatePin() {

  let pin = Math.floor(Math.random() * (1000000 - 100000 + 1) + 10000);
  let l
  for (l = 0; l < currentPin.length; l++) {
    if (pin === pin[l]) {
      generatePin()
    }
  }
  currentPin.push(pin)
  return pin
}


module.exports = {
  newGame: function(sock, mongoId, io) {

    let pin = generatePin()

    io.emit('console', dateGet('Game Creation: ' + sock.id + ' ' + mongoId + ' ' + pin, sock))
    let data = []

      data[0] = true
      console.log('here')
      addServer.add(pin, sock.id, mongoId)
      let question = database.query('5d7c05781c9d44000065d1c9', 0, sock, io,users[sock.id] === sock.id)
      users[sock.id] = sock.id
      setTimeout((function() {users[sock.id] = '' }), 5000)
      data[1] = question
      if (!question) {
        //end game
      }
    return data
  },
  questions: function(questions, answers, sock) {
    console.log(io.sock.manager.roomClients[sock.id])
    console.log(questions)
    console.log(answers)

  }
}