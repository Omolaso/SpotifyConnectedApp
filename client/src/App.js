import React, {useState, useEffect } from 'react';
import { accessToken, getCurrentUserProfile } from './spotify';
import { catchErrors } from './components/utils';
import {Routes, Route, Link, ScrollRestoration } from "react-router-dom";
import './App.css';
import TopArtist from './components/TopArtist';
import TopTracks from './components/TopTracks';
import Playlists from './components/Playlists';
import PersonalProfile from './components/PersonalProfile';
import SinglePlaylist from './components/SinglePlaylist';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      //destructured 'data' from response.data. Response from getCurrentUserProfile() in spotify.js line 136
      const { data } = await getCurrentUserProfile();

      // console.log(data)
      setProfile(data)
    }

    catchErrors(fetchData()); //higher order function from utils.js

  },[]);


  return (
    <div className="App">
      <header className="App-header">
        {
          !token ? (
            <a 
              className="App-link" 
              href="http://localhost:8888/login"
            > 
              Log in to Spotify
            </a>
          ) : (
            //scrollrestoration to ensure navigated pages scroll to top
              <Routes>
                {/* <ScrollRestoration/>  */}
                <Route path="/" element={<PersonalProfile token={token} profile={profile}/>}/>
                <Route path="/top-artists" element={<TopArtist/>}/>
                <Route path="/top-tracks" element={<TopTracks/>}/>
                <Route path="/playlists" element={<Playlists/>}/>
                <Route path="/playlists/:playlistId" element={<SinglePlaylist/>}/> 
              </Routes>
          )
        }
      </header>
    </div>
  );
}

export default App;


