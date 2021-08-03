const express = require('express');
const socketio = require('socket.io');

//Data ---------------------------------------------
let members = ['{"Id":"1","Members":""}', '{"Id":"2","Members":""}'];
let servers = ['{ "Pin": "965643", "Id": "1", "Quiz_I": "1", "Members": "0", "User": "Gerald" }', '{ "Pin": "965644", "Id": "2", "Quiz_I": "2", "Members": "0", "User": "Gerald" }'];
let heighest = 2
//-------------------------------------------------------

function dateGet(message, sock) {
  var d = new Date();
  let array = []
  array.push(d.getHours() + ':' + d.getMinutes() + '  ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ': ' + message)
  array.push(sock.id)
  return array
}

module.exports = {
  console: function (text, sock) {
    var d = new Date();
    let array = []
    array.push(d.getHours() + ':' + d.getMinutes() + '  ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ': ' + text)
    array.push(sock.id)
    return array
  },



  newRequest: function (sock, text, io) {
    let send_data = []
    //format for console messages


    console.log(sock.id + ' ' + text);

    //Broadcast server connection request
    io.emit('console', dateGet('Join request: ' + sock.id + ' ' + text, sock))
    let exist = false

    //check if server ID exsists
    for (i = 0; i < servers.length; i++) {
      let pins = JSON.parse(servers[i])
      if (text == pins.Pin) {
        exist = true
        console.log('found')
        sock.join(text);
        //add them to room
        send_data[1] = pins.Pin

        //Broadcast to console
        io.emit('console', dateGet('Join request approved: ' + sock.id + ' ' + text, sock))


        //update data 
        let newData = servers[i]
        newData = JSON.parse(newData)
        newData.Members = parseInt(newData.Members) + 1
        servers[i] = JSON.stringify(newData)

        //update members
        for (l = 0; l < members.length; l++) {
          let membersParsed = JSON.parse(members[l])
          if (membersParsed.Id == newData.Id) {
            let yah = membersParsed.Members
            console.log(yah.length)
            if (yah.length < 1) {
              yah = yah.split(" ")
            }
            yah.push(sock.id)
            console.log(yah)
            membersParsed.Members = yah
            JSON.stringify(membersParsed)
            members[l] = JSON.stringify(membersParsed)
            console.log('members added')
            send_data[0] = true
            break
          }
        }
      }
    }
    //join request denied
    if (exist == false) {
      io.emit('console', dateGet('Join request Denied: ' + sock.id + ' ' + text, sock))
      send_data[0] = false


    }
    return send_data
  },

  disconnect: function (sock, io) {

    for (let i = 0; i < servers.length; i++) {
      let data = JSON.parse(servers[i])
      if (data.User == sock.id) {
        servers.splice(i, 1);
        io.emit('console', dateGet('Owner Left: ' + sock.id, sock))
        io.to(data.Pin).emit('removed',`⚠️ Owner Left.`)
        console.log('owner has left')
        io.of('/').in(data.Pin).clients((error, socketIds) => {
          if (error) throw error;
          socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(data.Pin));
        });
        for (let z = 0; z < members.length; z++) {
          let membersData = JSON.parse(members[z])
          if (membersData.Id == i) {
            members.splice(z, 1);
            return
          }
        }
      }
      console.log(servers)
    }
    console.log('Disconnection: ' + sock.id);
    //broadcast to console
    io.emit('console', dateGet('Disconnection: ' + sock.id, sock))
    for (k = 0; k < members.length; k++) {
      let guss = members[k]

      guss = JSON.parse(guss)

      for (q = 0; q < guss.Members.length; q++)
        if (guss.Members[q] == sock.id) {
          guss.Members.splice(q, 1)
          members.splice(q, 1)
          JSON.stringify(guss)
          members.push(JSON.stringify(guss))
          console.log(members)
        }
    }


  },

  members: function (number) {
    if (number === -1) {
      return members
    } else {
      return members[number]
    }
  },
  servers: function (number) {
    if (number === -1) {
      return servers
    } else {
      return servers[number]
    }
  },
  add: function (pin, sock, mongo) {
    heighest = parseInt(heighest) + 1
    servers.push(`{ "Pin": "${pin}", "Id": "${heighest}", "Quiz_Id": "${mongo}", "Members": "0", "User": "${sock}" }`)
    members.push(`{"Id":"${heighest}","Members":""}`)
  }
}

