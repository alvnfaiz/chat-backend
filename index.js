var express = require("express")
var app = express()
var db = require("./database.js")
// var firebase = require("./firebase.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Welcome"})
});

app.get("/api/users", (req, res, next) => {
  var sql = "select * from user"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});
//Get User detail
app.get("/api/user/:id", (req, res, next) => {
  var sql = "select * from user where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":row
      })
    });
});

//Send Message
app.post("/api/message/", (req, res, next) => {
  var errors=[]
  if (!req.body.message){
      errors.push("No message specified");
  }
  if (!req.body.sender_id){
      errors.push("No sender specified");
  }
  if (!req.body.recipient_id){
      errors.push("No recipient specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }

  var data = {
      message: req.body.message,
      user_sender_id: req.body.sender_id,
      user_recipient_id : req.body.recipient_id
  }
  var sql ='INSERT INTO message (user_sender_id, user_recipient_id, message) VALUES (?,?,?)'
  var params =[data.user_sender_id, data.user_recipient_id, data.message]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
  // console.log(data)
})
//View Message for User with id = 1
app.get("/api/message/:id", (req, res, next) => {
  var sql = "select * from message where user_sender_id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":row
      })
    });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
