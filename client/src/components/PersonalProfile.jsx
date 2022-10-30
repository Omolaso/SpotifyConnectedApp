import React from 'react';
import { logout } from '../spotify';

const PersonalProfile = ({token, profile}) => {
  return (
    <div>
 
      <header>
        {
          !token ? (
            <a 
              className="App-link" 
              href="http://localhost:8888/login"
            > 
              Log in to Spotify
            </a>
          ) : (
            <>
              <h1>Logged in</h1>
              {
//NOTE: "&&" operator can be used for conditional rendering just like if statements and ternary operator but its basically for single rendering
//that is, just "truthy" and "falsy", no "if else". So the expression below is saying if "profile" === true (from state value),
//render the the div.
                profile && (
                  <div>
                    <h1>{profile.display_name}</h1>
                    <p>{profile.followers.total} Followers</p>
                    {profile.images.length && profile.images[0].url && (
                      <img src={profile.images[0].url} alt='Avatar'/>
                    )}
                  </div>
//Line 48 & 49, if there's an images (i.e if images.length > 1 OR images.length === true) and the image has a URL, render the image.
//Read this for more info (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)

                )
              }
              <button onClick={logout}>Log Out</button>
            </>
          )
        }
      </header>

    </div>
  )
}

export default PersonalProfile
