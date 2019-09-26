const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Importing Routes
const AuthRoute = require('./routes/auth');

//Middleware
app.use(express.json());
//app.use(bodyParser.json());

dotenv.config(); //load .env variables

//connect to DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    () => console.log('Connect to Database successfully'));




//Route Middleware
app.use('/api/user', AuthRoute);

app.listen(process.env.PORT, () => console.log(`Server is up and running on port ${process.env.PORT}`));