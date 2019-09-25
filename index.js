const express = require('express');
const app = express();

//Importing AuthRouter
const AuthRoute = require('./routes/auth');

//Route Middleware
app.use('/api/user', AuthRoute);


app.listen(process.env.PORT || 3000, () => console.log(`Server is up and running on port ${process.env.PORT}`))