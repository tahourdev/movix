import React, { useEffect, useState } from 'react';
import './styles.scss';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideoSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchLists } from '../../store/homeSlice';

const Details = () => {
  const { mediaType, id } = useParams();
  // const fullVideo = `https://vidsrc.to/embed/${mediaType}/${id}`;
  const { data, loading } = useFetch(`${mediaType}/${id}/videos`);
  const dispatch = useDispatch();
  const { watchLists } = useSelector((state) => state.home);

  if (watchLists?.length > 0) {
    console.log(watchLists[0]);
  }

  useEffect(() => {
    // Get the current watchList from localStorage
    const storedWatchList = JSON.parse(localStorage.getItem('watchList')) || [];

    // Update the watchList with the current id if it's not already in the list
    if (!storedWatchList.includes(id)) {
      const updatedWatchList = [...storedWatchList, id];
      dispatch(getWatchLists(updatedWatchList));

      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
    }
  }, [id]);

  const { data: credits, loading: creditsLoading } = useFetch(`${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
