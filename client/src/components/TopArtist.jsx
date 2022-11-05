import React, {useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, ArtistGrid, TimeRangeButtons } from '../pages';


const TopArtist = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('short'); //to activate getTopArtist time range

  useEffect(() => {

    const fetchData = async () => {

      const userTopArtists = await getTopArtists(`${activeRange}_term`);
      // console.log(getTopArtists());
      setTopArtists(userTopArtists.data);
    }

    catchErrors(fetchData()); //higher order function from utils.js
  }, [activeRange]);

  // console.log(topArtists);


  return (
    <main>
      {
      topArtists && (
      <SectionWrapper title="Top artists" breadcrumb="true">
        <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}/>
        <ArtistGrid artists={topArtists.items.slice(0, 10)} />
      </SectionWrapper>
        )
      }
    </main>
  )
}

export default TopArtist
