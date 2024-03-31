import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './styles.scss';
import Img from '../lazyLoadImage/Img';
import { FaRegStar } from 'react-icons/fa6';
import { LuTimer } from 'react-icons/lu';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import Genres from '../genres/Genres';
import { useNavigate } from 'react-router-dom';
import { addMovieToCart } from '../../store/homeSlice';

function MoviesBanner() {
  const [moviesBanner, setMoviesBanner] = useState([]);
  // const [movieId, setMovieId] = useState(null);
  const { url } = useSelector((state) => state.home);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, loading } = useFetch('trending/movie/day');

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  useEffect(() => {
    if (!loading && data && data.results && Array.isArray(data.results) && url && url.backdrop) {
      // Shuffle the array to get a random order
      // const shuffledResults = data.results.sort(() => Math.random() - 0.5);
      const shuffledResults = data.results.slice(0, 10);

      // Take only the first 10 items

      const movies = shuffledResults.map((movie) => {
        return movie;
      });

      setMoviesBanner(movies);
    }
  }, [data, loading, url]);

  const addToCartHandler = (id, genres, title, vote) => {
    const movie = { id, genres, title, vote };
    dispatch(addMovieToCart(movie));
  };

  return (
    <div className='movieBanner mb-10'>
      <Swiper
        draggable={true}
        pagination={pagination}
        modules={[Pagination, Autoplay]}
        className='mySwiper'
        autoplay={{ delay: 8000 }}>
        {moviesBanner.map((movie, index) => {
          // console.log(movie);
          const title = movie?.title;
          const vote_average = movie?.vote_average;
          const genreId = movie?.genre_ids;
          const overview = movie.overview;
          const movieId = movie.id;
          return (
            <SwiperSlide key={index}>
              <div className='textBlock'>
                <p className='text-white font-extrabold mb-6 md:text-[50px] text-[30px] sm:text-[40px] px-6'>
                  {title}
                </p>
                <div className='textBlock-item'>
                  <div className='item'>
                    <FaRegStar />
                    <span>{vote_average.toFixed(1)}</span>
                  </div>
                  {/* <div className='item'>
                    <LuTimer />
                    <span>150</span>
                  </div> */}
                  <Genres data={genreId.slice(0, 2)} />
                </div>
                <div className='max-w-3xl mx-auto px-4 line-clamp-2 text-slate-300 mt-6'>
                  <small>{overview}</small>
                </div>
                <div
                  className='mt-6 flex items-center px-4 gap-2 flex-wrap w-full justify-center text-white 
                font-semibold text-sm'>
                  <button
                    onClick={() => navigate(`/${movie.media_type || mediaType}/${movieId}`)}
                    className='px-6 inline-flex items-center gap-1 py-2 rounded-full bg-rose-600 hover:bg-rose-700 
                    transition-all duration-300 ease-linear ring-rose-600 ring-1'>
                    <span>Watch Now</span>
                    <FaRegCirclePlay />
                  </button>
                  <button
                    onClick={() => addToCartHandler(movieId, title, vote_average, genreId)}
                    className='px-6 inline-flex items-center gap-1 py-2 transition-all duration-300 ease-linear bg-transparent
                     hover:bg-rose-600 rounded-full ring-rose-500 ring-1'>
                    <span>Add to Bookmark</span>
                    <MdOutlineFavoriteBorder />
                  </button>
                </div>
              </div>
              <div className='backdrop-img'>
                <Img src={url.backdrop + (movie?.backdrop_path || '')} />
              </div>
              <div className='opacity-layer'></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MoviesBanner;
