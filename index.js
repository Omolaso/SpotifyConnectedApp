require('dotenv').config();
//to confirm that dotenv is working
// console.log(process.env.CLIENT_ID)

const express = require('express');

const app = express();

//EXPRESS BASIC SYNTAX
//app.METHOD(PATH, HANDLER[note: handler is the callback function that runs everytime a user hits a specific URL])
app.get('/', (req, res) => {
    res.send('Hey World');
});

const port = 8888;
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
});
