const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');


env.config();

app.use(express.json());

app.listen(3000,()=>{
    console.log("Server listening on port")
})