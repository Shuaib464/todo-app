const express = require('express')

// create instance of server
const app = express();

//load config from env file
require('dotenv').config()

// define port no for server
const PORT = process.env.PORT || 4000;

// middleware to parse req body
app.use(express.json());

// mount the todo api routes
const todoRoutes = require('./routes/todos')
app.use('/api/v1', todoRoutes);

// Live the server at given Port 
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT} successfully`);
})

// connect with DB
const dbConnect = require('./config/database')
dbConnect();