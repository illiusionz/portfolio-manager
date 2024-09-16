import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSun,
  faMoon,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import './_navBar.scss';
import { setTheme } from '../../features/theme/themeSlice'; // Redux slice
import profileImage from '../../assets/images/user-image.jpg';
import SymbolAutoSuggest from '../shared/SymbolAutoSuggest'; // Importing shared autosuggest
import { setSymbolAndFetchData } from '../../features/user/userThunks'; // Unified action

const Navbar = ({ toggleSidebar, handleSymbolSearch }) => {
  const symbol = useSelector((state) => state.user.symbol); // Get the selected symbol from Redux
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // Fetch saved theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (symbol) {
      dispatch(setSymbolAndFetchData(symbol)); // Unified action to fetch and sync symbol
    }
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme)); // Toggle theme and persist in local storage
    localStorage.setItem('theme', newTheme);
  };

  // Example: Toggle dark mode
  const toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('dark');
  };

  return (
    <nav className='navbar navbar-expand-lg'>
      <button className='btn btn-primary' onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <form className='form-inline my-2 my-lg-0' onSubmit={onSubmit}>
        <div className='input-group'>
          <SymbolAutoSuggest /> {/* Symbol synced via Redux */}
        </div>
        <button className='btn btn-primary ms-1 my-2 my-sm-0' type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <button
        className='btn btn-light ms-auto my-2 my-sm-0 theme-toggle'
        type='button'
        onClick={toggleTheme}>
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
      </button>
      <ul className='navbar-nav navbar-align'>
        <li className='nav-item dropdown'>
          <div className='nav-link dropdown-toggle'>
            <img src={profileImage} alt='User' className='user-image' />
            <span className='user-name'>Jeff Liu</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
