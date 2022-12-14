import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { catchErrors } from '../utils'
import { getPlaylistById, getAudioFeaturesForTracks } from '../spotify';
import { StyledHeader, StyledDropdown } from '../styles';
import { TrackList, SectionWrapper, Loader } from '../pages';
import axios from 'axios';


const SinglePlaylist = () => {

  const { id } = useParams();
  const [singlePlaylist, setSinglePlaylist] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [sortValue, setSortValue] = useState('');
  const sortOptions = ['danceability', 'tempo', 'energy'];

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setSinglePlaylist(data);
      setTracksData(data.tracks);
    };

    catchErrors(fetchData());
  }, [id]);
    // console.log(singlePlaylist);

    // When tracksData updates, compile arrays of tracks and audioFeatures
  useEffect(() => {
    if (!tracksData) {
      return;
    }

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state variable
    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data);
      }
    };

    setTracks(tracks => ([
      ...tracks ? tracks : [],
      ...tracksData.items
    ]));

    catchErrors(fetchMoreData());
  }, [tracksData]);

  // const tracksForTracklist = useMemo(() => {
  //   if (!tracks) {
  //     return;
  //   }
  //   return tracks.map(({ track }) => track);
  // }, [tracks]);


 // Also update the audioFeatures state variable using the track IDs
  const fetchAudioFeatures = async () => {
    const ids = tracksData.items.map(({ track }) => track.id).join(',');
    const { data } = await getAudioFeaturesForTracks(ids);
    setAudioFeatures(audioFeatures => ([
      ...audioFeatures ? audioFeatures : [],
      ...data['audio_features']
      ]));
    };
    catchErrors(fetchAudioFeatures());

     // Map over tracks and add audio_features property to each track
  const tracksWithAudioFeatures = useMemo(() => {
    if (!tracks || !audioFeatures) {
      return null;
    }

    return tracks.map(({ track }) => {
      const trackToAdd = track;

      if (!track.audio_features) {
        const audioFeaturesObj = audioFeatures.find(item => {
          if (!item || !track) {
            return null;
          }
          return item.id === track.id;
        });

        trackToAdd['audio_features'] = audioFeaturesObj;
      }

      return trackToAdd;
    });
  }, [tracks, audioFeatures]);
  // console.log(audioFeatures);

    // Sort tracks by audio feature to be used in template
  const sortedTracks = useMemo(() => {
    if (!tracksWithAudioFeatures) {
      return null;
    }

    return [...tracksWithAudioFeatures].sort((a, b) => {
      const aFeatures = a['audio_features'];
      const bFeatures = b['audio_features'];

      if (!aFeatures || !bFeatures) {
        return false;
      }

      return bFeatures[sortValue] - aFeatures[sortValue];
    });
  }, [sortValue, tracksWithAudioFeatures]);



  return (
    <>
    {singlePlaylist ? (
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

        <main>
          <StyledDropdown active={!!sortValue}>
            <label className="sr-only" htmlFor="order-select">Sort tracks</label>
            <select
              name="track-order"
              id="order-select"
              onChange={e => setSortValue(e.target.value)}
              >
              <option value="">Sort tracks</option>
              {sortOptions.map((option, i) => (
                <option value={option} key={i}>
                  {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                </option>
              ))}
            </select>
          </StyledDropdown>

          <SectionWrapper title="Playlist" breadcrumb={true}>
            {sortedTracks && (
              <TrackList tracks={sortedTracks} />
            )}
          </SectionWrapper>
        </main>
      </>
    ) : <Loader/>}
  </>
  )

}

export default SinglePlaylist
