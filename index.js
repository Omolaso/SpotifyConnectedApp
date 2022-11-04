require('dotenv').config();
//to confirm that dotenv is working
// console.log(process.env.CLIENT_ID)
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const app = express();

/**
 Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length)); 
      //generates a random integer between the length of 'possible' and append a random string that is equal to the integer to text. 
    }
    return text;
  };
  
  const stateKey = 'spotify_auth_state';

//EXPRESS BASIC SYNTAX
//app.METHOD(PATH, HANDLER[note: handler is the callback function that runs everytime a user hits a specific URL])

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = [
      'user-read-private',
      'user-read-email',
      'user-top-read',
    ].join(' ');

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });
    // res.send('log')
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
    // res.redirect(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`);
});


app.get('/callback', function(req, res){
    // res.send('callback');
    const code = req.query.code || null;
      
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
    .then(response => {
        if (response.status === 200) {
            
          const { access_token, refresh_token, expires_in } = response.data;

          const queryParams = querystring.stringify({
            access_token,
            refresh_token,
            expires_in
          });
        //redirect to reactapp
        res.redirect(`http://localhost:3000/?${queryParams}`)
    
        } else {
            res.redirect(`/?${querystring.stringify({error:
                'invalid_token'})}`);
        }
      })
      .catch(error => {
        res.send(error);
      });
});



app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
  });








const port = 8888;
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
});
