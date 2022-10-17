
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'alex',
    password: process.env.DB_PW,
    database: 'user_info'
  });
  
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
    const query = `create table if not exists users(
      id int primary key auto_increment,
      email varchar(255)not null,
      password varchar(255) not null
    )`;
  
    connection.query(query, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
});
  

app.post("/login", (req, res) => {
  const pw = req.body["password"];
  const email = req.body["email"];
  connection.query(`SELECT password FROM users WHERE email=?`, [email], function(err, results, fields) {
    if (err) {
      console.log(hashedPw);
      res.status(500).json({ status: 500, error: `Server error: ${err.message}`});
    } else {
      console.log();
      if(results.length){
        if(bcrypt.compareSync(pw, results[0]["password"])){
          res.status(200).json({status: 200, message:"User found"});
        } else {
          res.status(401).json({status:401, message: "Incorrect Password"});
        }

      } else {
        res.status(401).json({status:401, message: "User not found"});
      }
    }
  });

})

app.post("/register", (req, res) => {
  const pw = req.body["password"];
  const email = req.body["email"];
  connection.query(`SELECT * FROM users WHERE email=?`, [email], function(err, results){
    if(err){
      res.status(500).json({status:500, error: `Server error: ${err.message}`})
    } else {
      if(results.length){
        res.status(401).json({status:401, message: "User already exists!"});
      } else {
        bcrypt.hash(pw, saltRounds)
        .then(function(hash) {
          // Store hash in your password DB.
          connection.query(`INSERT INTO users (email, password) 
          VALUES (?, ?);`, [email, hash], function(err) {
              if(err){
              res.status(500).json({status:500, error: `Server error: ${err.message}`})
              } else {
              res.status(200).json({status: 200, message: "User added!"});
              }
            })
        });
      }
    }
  })

})






