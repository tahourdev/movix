import React, { useState, useEffect, useContext } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { MdOutlineContactEmergency } from 'react-icons/md';
import { IoNotificationsCircleOutline, IoSearchCircleOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

import './styles.scss';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../assets/movix-logo.svg';
import Authentication from '../authentication/Authentication';
import { useGlobalContext } from '../../hooks/ContextProvider';
import MenubarDemo from '../radix-menubar/MenuBar';
import useFetch from '../../hooks/useFetch';

let genreId = '';
const Header = () => {
  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  // const [menuItemValue, setMenuItemValue] = useState('');

  const { currentUser, showAuth, setShowAuth, dispatch } = useGlobalContext();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  useEffect(() => {
    const handleBodyScroll = () => {
      document.body.style.overflow = showAuth ? 'hidden' : 'auto';
    };

    // Add event listener to handle body scroll when the component mounts
    handleBodyScroll();

    return () => {
      // Remove event listener when the component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [showAuth]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('hide');
      } else {
        setShow('show');
      }
    } else {
      setShow('top');
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 500);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu((prev) => !prev);
    setShowSearch(false);
  };

  const { data: genresData } = useFetch('genre/movie/list');
  // console.log(genresData?.genres);

  const navigationHandler = (type) => {
    setMobileMenu(false);
    if (type === 'movie') {
      navigate('movie');
    } else if (type === 'tv') {
      navigate('tv');
    } else if (type === type) {
      navigate(`/genre/${type}`);
    }
  };

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header>
      <nav className={`header z-30 ${mobileMenu ? 'mobileView' : ''} ${show} `}>
        <ContentWrapper>
          <div className='mobileMenuItems'>
            <AiOutlineMenuUnfold className='cursor-pointer' onClick={openMobileMenu} />
          </div>
          <div className='logo' onClick={() => navigate('/')}>
            <img className='h-[40px] md:h-14 cursor-pointer' src={logo} alt='' />
          </div>

          {/*  */}
          <div className='flex-1 inline-flex items-center'>
            <div className='md:flex hidden items-center'>
              <Link className='text-white  mr-3 ml-8' to='/'>
                Home
              </Link>

              {/* Radix library menu bar */}
              <MenubarDemo
                navigationHandler={navigationHandler}
                type='genre'
                menuBar={true}
                menuItems={genresData?.genres}
                genreId={genreId}
                menuTitle='Genre'
              />
              <MenubarDemo
                navigationHandler={navigationHandler}
                type='country'
                menuBar={true}
                genreId={genreId}
                menuTitle='Country'
              />

              <MenubarDemo
                navigationHandler={navigationHandler}
                type='movie'
                menuBar={false}
                menuTitle='Movies'
              />
              <MenubarDemo
                navigationHandler={navigationHandler}
                type='tv'
                menuBar={false}
                menuTitle='TV Shows'
              />
            </div>

            <ul className='menuItems-right justify-end inline-flex flex-1'>
              <li>
                <IoSearchCircleOutline
                  className='text-white hover:text-slate-200 transition-all duration-300 ease-linear 
                  inline-flex items-center justify-center text-3xl cursor-pointer mr-1'
                  onClick={openSearch}
                />
              </li>
              {!currentUser && (
                <>
                  <li
                    onClick={() => setShowAuth(true)}
                    className='text-white font-semibold px-3 py-1.5 text-nowrap sm:text-base text-sm cursor-pointer gap-1 rounded-lg ml-1
                inline-flex items-center justify-center'>
                    <MdOutlineContactEmergency />
                    <span>Sign in</span>
                  </li>
                </>
              )}

              {currentUser && (
                <>
                  <li
                    onClick={() => {}}
                    className='text-white hover:text-slate-200 transition-all duration-300 ease-linear 
                  h-8 w-8 inline-flex items-center justify-center text-3xl cursor-pointer'>
                    <IoNotificationsCircleOutline />
                  </li>
                  <li
                    onClick={() => {}}
                    className='text-white hover:text-slate-200transition-all duration-300 ease-linear 
                  h-8 w-8 inline-flex items-center justify-center ml-1 text-2xl cursor-pointer'>
                    <FaUserCircle />
                  </li>
                  <li className='text-white text-sm ml-2'>
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </ContentWrapper>

        {/* Show Search */}
        {showSearch && (
          <div className='searchBar'>
            <ContentWrapper>
              <div className='searchInput'>
                <input
                  type='text'
                  placeholder='Search for a movies or TV show...'
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                />
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </ContentWrapper>
          </div>
        )}
      </nav>

      {/* Show Authentication form */}
      <Authentication />
    </header>
  );
};

export default Header;
