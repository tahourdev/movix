import React, { useState, useEffect } from 'react';
import { useNavigate, useRevalidator } from 'react-router-dom';
import './styles.scss';
import useFetch from '../../../hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const { data, loading } = useFetch('movie/upcoming');

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
    // console.log(bg);
  }, [data]);

  return (
    <div className='heroBanner'>
      {!loading && (
        <div className='backdrop-img'>
          <Img src={background} />
        </div>
      )}
      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>Millions of moveis, TV shows and people to discover. explore now </span>
          <div className='searchInput'>
            <input
              type='text'
              placeholder='Search for a movies or TV show...'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
