import React, {useState, useEffect } from 'react';
import { getTopTracks } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, TrackList, TimeRangeButtons, Loader } from '../pages';


const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState('short'); //to activate getTopTracks time range


  useEffect(() => {

    const fetchData = async () => {

      const userTopTracks = await getTopTracks(`${activeRange}_term`);
      // console.log(getTopTracks());
      setTopTracks(userTopTracks.data);
    }

    catchErrors(fetchData()); //higher order function from utils.js
  },[activeRange]);

  // console.log(topTracks);

  return (
    <>
      {topTracks ? (
        <main>  
          <SectionWrapper title="Top tracks" breadcrumb="true">
            <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}/>
            <TrackList tracks={topTracks.items} />
          </SectionWrapper>
        </main>
      ) : <Loader/>}
    </>
  )
}

export default TopTracks
