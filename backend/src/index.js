const express = require('express');
const env = require('dotenv');
const db = require('./config/connection')
const cors = require('cors');
const session = require('express-session');
env.config();


// Routes
const userRouter = require('./routes/user')

const app = express();


app.use(express.json());
app.use(cors());

db.database();
app.use(session({
    secret: 'secret',
    cookie : {
      maxAge : 1000*10*6*10
    },
    saveUninitialized: true,
    resave : true,
  }))


app.use('/',userRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`)
})