import React, {useState, useEffect } from 'react';
import { accessToken, getCurrentUserProfile, getCurrentUserPlaylists } from './spotify';
import { catchErrors } from './components/utils';
import { Routes, Route } from "react-router-dom";
import { 
  PersonalProfile, 
  Login, 
  TopArtist, 
  TopTracks, 
  SinglePlaylist, 
  Playlists, 
  ScrollToTop } from './components';
import { GlobalStyles } from './styles';


function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlist, setPlaylist] = useState(null);


  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      // console.log(getCurrentUserProfile())
      setProfile(userProfile.data);

      const userPlaylist = await getCurrentUserPlaylists();
      // console.log(getCurrentUserPlaylists());
      setPlaylist(userPlaylist.data)
    }

    catchErrors(fetchData()); //higher order function from utils.js

  },[]);


  return (
    <div>
      <GlobalStyles/>
      <header>
        {
          !token ? (
            <Login/>
          ) : (
            //ScrollToTop to ensure navigated pages scroll to top
              <>
                <ScrollToTop/>
                <Routes>
                  <Route path="/" element={<PersonalProfile profile={profile} playlist={playlist}/>}/>
                  <Route path="/top-artists" element={<TopArtist/>}/>
                  <Route path="/top-tracks" element={<TopTracks/>}/>
                  <Route path="/playlists" element={<Playlists/>}/>
                  <Route path="/playlists/:playlistId" element={<SinglePlaylist/>}/> 
                </Routes>
              </>
          )
        }
      </header>
    </div>
  );
}

export default App;


