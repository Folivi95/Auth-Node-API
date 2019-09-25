const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config(); //load .env variables


//connect to DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    () => console.log('Connect to Database successfully'));

//Importing AuthRouter
const AuthRoute = require('./routes/auth');

//Route Middleware
app.use('/api/user', AuthRoute);


app.listen(3000, () => console.log(`Server is up and running on port ${process.env.PORT}`))