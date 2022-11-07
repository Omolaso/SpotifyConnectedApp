import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { catchErrors } from '../utils'
import { getPlaylistById } from '../spotify';
import { StyledHeader } from '../styles';


const SinglePlaylist = () => {

  const { id } = useParams();
  const [singlePlaylist, setSinglePlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setSinglePlaylist(data);
    };

    catchErrors(fetchData());
  }, [id]);

  // console.log(singlePlaylist);

  return (
    <>
    {singlePlaylist && (
      <>
        <StyledHeader>
          <div className="header__inner">
            {singlePlaylist.images.length && singlePlaylist.images[0].url && (
              <img className="header__img" src={singlePlaylist.images[0].url} alt="singlePlaylist Artwork"/>
            )}
            <div>
              <div className="header__overline">Playlist</div>
              <h1 className="header__name">{singlePlaylist.name}</h1>
              <p className="header__meta">
                {singlePlaylist.followers.total ? (
                  <span>{singlePlaylist.followers.total} {`follower${singlePlaylist.followers.total !== 1 ? 's' : ''}`}</span>
                ) : null}
                <span>{singlePlaylist.tracks.total} {`song${singlePlaylist.tracks.total !== 1 ? 's' : ''}`}</span>
              </p>
            </div>
          </div>
        </StyledHeader>
      </>
    )}
  </>
  )

}

export default SinglePlaylist
