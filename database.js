var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err.message)
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["user1","user1@alvin.com",md5("12345678")])
                db.run(insert, ["user2","user2@alvin.com",md5("12345678")])
                console.log("Table created.")
            }
        });
        db.run(`CREATE TABLE message (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_sender_id int NOT NULL, 
          user_recipient_id int NOT NULL, 
          message text NOT NULL,
          FOREIGN KEY (user_sender_id) REFERENCES user(id),
          FOREIGN KEY (user_recipient_id) REFERENCES user(id)
          )`,
      (err) => {
          if (err) {
              // Table already created
              console.log(err.message)
          }else{
              // Table just created, creating some rows
              console.log("Table created.")
          }
      });  
    }
});
module.exports = db