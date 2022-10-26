import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    const querystring = window.location.search; //returns all strings after question mark{?} in a URL.
    const urlParams = new URLSearchParams(querystring);
    //URLSearchParams defines utility methods to work with the querystring of a URL. Check MDN Web docs for more info.
    const accessToken = urlParams.get('access_token'); //get takes the key pair in the URL as parameter and returns the value.
    const refreshToken = urlParams.get('refresh_token');
    console.log(accessToken);
    console.log(refreshToken);


    if (refreshToken) {
      //fetch(`http://localhost:8888/refresh_token?refresh_token=${refreshToken}`)
      //The fetch above gave a cross error {cross origin resourse sharing error}. This is because I'm trying to access data (or request resourses from another domain), that is
      //between backend localhost8888 & frontend localhost3000 and the domain I'm accessing from is not permanent (localhost8888).
      //To fix this, I set up a proxy in my react app package.json and remove the domain from the new fetch.
      //A proxy server is a server application that acts as an intermediary between a client requesting a resource and the server 
      //providing that resource



      fetch(`/refresh_token?refresh_token=${refreshToken}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }
  },[])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:8888/login"
        >
          Log in to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
