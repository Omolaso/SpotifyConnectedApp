import React from 'react';
import { logout } from '../spotify';
import styled from 'styled-components/macro';
import { StyledHeader } from '../styles';
import { 
  SectionWrapper,
  ArtistGrid,
  TrackList,
  PlaylistsGrid} from '../pages';



const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

const PersonalProfile = ({ profile, playlist, topArtists, topTracks }) => {
  return (
    <>
        {
//NOTE: "&&" operator can be used for conditional rendering just like if statements and ternary operator but its basically for single rendering
//that is, just "truthy" and "falsy", no "if else". So the expression below is saying if "profile" === true (from state value),
//render the the div.
          profile && (
          <StyledHeader type='user'>
           <div className="header__inner">
              {profile.images.length && profile.images[0].url && (
                <img className='header__img' src={profile.images[0].url} alt='Avatar'/> //still works without the condition
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  {playlist && (
                    <span>{playlist.total} Playlist{playlist.total <= 1 ? '' : 's'}</span>
                  )}
                  <span>
                    {profile.followers.total} Follower{profile.followers.total <= 1 ? '' : 's'}
                  </span>
                </p>
              </div>
           </div>
          </StyledHeader>
//Line 33 & 34, if there's an images (i.e if images.length > 1 OR images.length === true) and the image has a URL, render the image.
//Read this for more info (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)

          )
        }
      <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>

      
            {topArtists && topTracks && playlist && (
              <main>
                <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                  <ArtistGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>
  
                <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                  <TrackList tracks={topTracks.items.slice(0, 10)} />
                </SectionWrapper>
  
                <SectionWrapper title="Playlists" seeAllLink="/playlists">
                  <PlaylistsGrid playlists={playlist.items.slice(0, 10)} />
                </SectionWrapper>
              </main>
            )}
          

    </>
  )
}

export default PersonalProfile
