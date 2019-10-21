var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
let gamery = require('./game.js')
let featuredId = ['5dab6fa21c9d440000526cee','5dab6fa21c9d440000526cee']


var uri = "mongodb+srv://Kahoot-admin:AdminOfKahoot888@kahootquestions-zl6vb.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Kahoot");
  let QueryDatabase = function(id) {
    var query = { "_id": new ObjectId(id) };
    dbo.collection("Kahoot").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log('result: ' + JSON.stringify(result))
      db.close();
      result1(result)
      return
    });
  }

});

module.exports = {
  query: function(id, question, sock, io, ddos) {
    if (ddos) {
      io.sockets.connected[sock.id].emit('Questions', 'Please wait before making another request');
    } else if(!ddos) {
      MongoClient.connect(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Kahoot");
        var query = { "_id": new ObjectId(id) };
        dbo.collection("Kahoot").find(query).toArray(function(err, result) {
          if (err) throw err;
          db.close();
          io.sockets.connected[sock.id].emit('Questions', result);
      });
    });
    }
    return
  },
  homepageQuery: function(sock) {
    MongoClient.connect(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Kahoot");
      var query = { "public": true };
      dbo.collection("Kahoot").find(query).limit(10).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        sock.emit('homepage-query(recieve)', result)
        return

      });
    });
  },
  homepageQuerySpecific: function(sock,data) {
   
      MongoClient.connect(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Kahoot");
        var query = { _id:  new ObjectId(data) };
        dbo.collection("Kahoot").find(query).toArray(function(err, result) {
          if (err) throw err;
          db.close();
          sock.emit('homepage-query(recieve)Specific', result)
          return
      });
    });
    
  },
  Trending: function(sock){
    for(let i = 0;i<featuredId.length;i++){
    MongoClient.connect(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      
      
        console.log('here')
        var dbo = db.db("Kahoot");
        var query = { _id:  new ObjectId(featuredId[i]) };
        dbo.collection("Kahoot").find(query).toArray(function(err, result) {
          if (err) throw err;
          sock.emit('feautured-list', result)
          db.close();
          return
      });
      
      

      
  });
  }
},
  Search: function(data,sock){
    MongoClient.connect(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      
      
        console.log('here')
        var dbo = db.db("Kahoot");
        var replace = data;
        var re = new RegExp(replace,'i');
        console.log(re)
        var query = { Title:  re };
        console.log(query)
        dbo.collection("Kahoot").find(query).limit(10).toArray(function(err, result) {
          if (err) throw err;
          sock.emit('search-recieve', result)
          db.close();
          return
  })
})
}
}
  



