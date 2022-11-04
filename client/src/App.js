import React, {useState, useEffect } from 'react';
import { 
  accessToken,
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks
} from './spotify';
import { catchErrors } from './utils';
import { Routes, Route } from "react-router-dom";
import { 
  PersonalProfile, 
  Login, 
  TopArtist, 
  TopTracks, 
  SinglePlaylist, 
  Playlists, 
  ScrollToTop
} from './components';
import { GlobalStyles } from './styles';


function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);


  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      // console.log(getCurrentUserProfile())
      setProfile(userProfile.data);

      const userPlaylist = await getCurrentUserPlaylists();
      console.log(getCurrentUserPlaylists());
      setPlaylist(userPlaylist.data);

      const userTopArtists = await getTopArtists();
      // console.log(getTopArtists());
      setTopArtists(userTopArtists.data);

      const userTopTracks = await getTopTracks();
      // console.log(getTopTracks());
      setTopTracks(userTopTracks.data);
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
                  <Route 
                    path="/" 
                    element= {<PersonalProfile 
                      profile={profile}
                      playlist={playlist}
                      topArtists={topArtists}
                      topTracks={topTracks}
                    />}
                  />
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


