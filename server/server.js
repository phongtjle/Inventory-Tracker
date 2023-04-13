//Taken from https://www.mongodb.com/languages/mern-stack-tutorial#:~:text=the%20Back%20End-,What%20is%20the%20MERN%20Stack%3F,variants%20of%20the%20MEAN%20stack.
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
//app.use(require("./routes/record"));
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host : 'localhost',
    user: 'stackguy',
    password: 'stackieguy',
    database: 'inventory',
    connectionLimit: 5
});

//https://github.com/mariadb-corporation/mariadb-connector-nodejs#quick-start
async function asyncFunction() {
    let conn;
    try {
  
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT 1 as val");
      // rows: [ {val: 1}, meta: ... ]
  
      const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
      // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
    } finally {
      if (conn) conn.release(); //release to pool
    }
  }

app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
});