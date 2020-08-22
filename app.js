const express = require('express');
const mongoose = require('mongoose');
const User = require('./api/models/userModel')
const bodyParser = require('body-parser')

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/UsersDB', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


const routes = require('./api/routes/userRoutes');
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})