import React, {useState, useEffect } from 'react';
import { accessToken, getCurrentUserProfile } from './spotify';
import { catchErrors } from './components/utils';
import {Routes, Route, Link} from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import TopArtist from './components/TopArtist';
import TopTracks from './components/TopTracks';
import Playlists from './components/Playlists';
import PersonalProfile from './components/PersonalProfile';
import SinglePlaylist from './components/SinglePlaylist';
import styled, { createGlobalStyle } from 'styled-components/macro';

//STYLED COMPONENTS

//globalStyles
const GlobalStyles = createGlobalStyle`
 :root {
    --black: #121212;
    --green: #1DB954;
    --white: #ffffff;

    --font: 'Circular Std', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  };


  html {
    box-sizing: border-box;
  };

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  };

  body {
    margin: 0;
    padding: 0;
    background-color: var(--black);
    color: white;
  }`;



//loginBtn
const StyledLoginButton = styled.a` //'styled.a' because the styled component is an anchor tag
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
  text-decoration: none;
`;

//STYLED COMPONENTS

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
    <div>
      <GlobalStyles/>
      <header>
        {
          !token ? (
            <StyledLoginButton 
              href="http://localhost:8888/login"
            > 
              Log in to Spotify
            </StyledLoginButton>
          ) : (
            //ScrollToTop to ensure navigated pages scroll to top
              <>
                <ScrollToTop/>
                <Routes>
                  <Route path="/" element={<PersonalProfile token={token} profile={profile}/>}/>
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


