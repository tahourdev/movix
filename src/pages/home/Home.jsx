import React from 'react';
import './styles.scss';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';
import MoviesBanner from '../../components/moviesBanner/MoviesBanner';

const Home = () => {
  return (
    <div>
      {/* <HeroBanner /> */}
      <MoviesBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
