require('dotenv').config();
//to confirm that dotenv is working
// console.log(process.env.CLIENT_ID)
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_;
const REDIRECT_URI = process.env.REDIRECT_URI;


const express = require('express');

const app = express();

//EXPRESS BASIC SYNTAX
//app.METHOD(PATH, HANDLER[note: handler is the callback function that runs everytime a user hits a specific URL])
app.get('/login', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&
    redirect_uri=${REDIRECT_URI}`);
});

const port = 8888;
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
});
