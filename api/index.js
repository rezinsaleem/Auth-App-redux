import express from 'express';
import  dotenv from 'dotenv';
dotenv.config()
import pkg from 'pg';
const { Client } = pkg;

const client  = new Client({
  user:process.env.SQL_USER,
  password:process.env.SQL_PASSWORD,
  host:process.env.SQL_HOST,
  port:process.env.SQL_PORT,
  database:process.env.SQL_DB
})

client.connect()
.then(()=> console.log('Database Connected Successfully'))
.catch(e => console.log(e))
.finally(()=> client.end())

const app = express();

const PORT = process.env.PORT;
app.listen(3000, ()=>{
  console.log(`server is running on http://localhost:${PORT}`)
})