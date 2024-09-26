// src/App.js
import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  fetchStocks,
  fetchStockSnapshot,
} from '../features/stocks/stockThunks';
import { setUserSymbol } from '../features/user/userSlice';
import { setTheme } from '../features/theme/themeSlice';
import { selectTheme } from '../features/theme/themeSelectors';

import SideBar from '../layout/SideBar/SideBar';
import NavBar from '../layout/NavBar/NavBar';
import Footer from '../layout/Footer/Footer';

import TrendingToolbar from '../components/TrendingToolbar/TrendingToolbar';

// Lazy load the components
import HomePage from '../pages/HomePage/HomePage';

const PortfolioPage = lazy(() =>
  import('../pages/PortfolioPage/PortfolioPage')
);
const ChartAnalysisPage = lazy(() =>
  import('../pages/ChartAnalysisPage/ChartAnalysisPage')
);
const CalendarPage = lazy(() => import('../pages/CalendarPage/CalendarPage'));
const StockNewsPage = lazy(() =>
  import('../pages/StockNewsPage/StockNewsPage')
);
const EducationPage = lazy(() =>
  import('../pages/EducationPage/EducationPage')
);
const AssetManagementPage = lazy(() =>
  import('../pages/AssetManagementPage/AssetManagementPage')
);

function App() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useSelector(selectTheme);
  const reduxSymbol = useSelector((state) => state.user.userSymbol);
  const [userSymbol, setSymbol] = useState(
    localStorage.getItem('selectedStockSymbol') || 'AAPL'
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'theme-light' ? 'theme-dark' : 'theme-light';
    dispatch(setTheme(newTheme));
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // Check if there's a symbol in Redux state or localStorage
    if (!reduxSymbol) {
      // Dispatch the default symbol if not present
      console.log('Setting default symbol: AAPL');
      dispatch(setUserSymbol(userSymbol));
    }
    console.log('App.js Fetching data for symbol:', userSymbol);
    dispatch(fetchStocks(userSymbol));
    dispatch(fetchStockSnapshot(userSymbol));
  }, []);

  const handleSymbolSearch = (query) => {
    setSymbol(query);
    localStorage.setItem('lastStock', query);
    dispatch(setUserSymbol(query));
    dispatch(fetchStocks(query));
    dispatch(fetchStockSnapshot(query));
  };

  return (
    <div className={`d-flex ${isSidebarOpen ? '' : 'toggled'}`} id='wrapper'>
      <Suspense fallback={<div>Loading...</div>}>
        <SideBar />
      </Suspense>
      <div id='page-content-wrapper' className={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <NavBar
            toggleSidebar={toggleSidebar}
            handleSymbolSearch={handleSymbolSearch}
            toggleTheme={toggleTheme}
          />
          <TrendingToolbar />
        </Suspense>
        <div className='container-fluid'>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/stock-portfolio' element={<PortfolioPage />} />
              <Route path='/calendar' element={<CalendarPage />} />
              <Route path='/ai-assistant' element={<ChartAnalysisPage />} />
              <Route
                path='/asset-management'
                element={<AssetManagementPage />}
              />
              <Route path='/stock-news' element={<StockNewsPage />} />
              <Route path='/education' element={<EducationPage />} />
            </Routes>
          </Suspense>
        </div>
        <Suspense>{/*<Footer />*/}</Suspense>
      </div>
    </div>
  );
}

export default App;
