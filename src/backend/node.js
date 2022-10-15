
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



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
      password varchar(20) not null
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
  connection.query(`SELECT * FROM users WHERE email=? AND pw=?`, [email, pw], function(err, results, fields) {
    if (err) {
      console.log(err.message);
      res.status(500).json({ status: 500, error: `Server error: ${err.message}`});
    } else {
      if(results.length){
        res.status(200).json({status: 200, message:"User found"});
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
        connection.query(`INSERT INTO users (email, password) 
            VALUES (?, ?);`, [email, pw], function(err) {
                if(err){
                res.status(500).json({status:500, error: `Server error: ${err.message}`})
              } else {
                res.status(200).json({status: 200, message: "User added!"});
              }
        })
      }
    }
  })

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})




