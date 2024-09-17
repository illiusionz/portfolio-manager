// src/App.js
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { fetchStocks, fetchStockPrice } from '../features/stocks/stockThunks';
import { setUserSymbol } from '../features/user/userSlice'; // Correct import
import { setTheme } from '../features/theme/themeSlice';

// Lazy load the components
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ChartAnalysisPage = lazy(() =>
  import('../pages/ChartAnalysisPage/ChartAnalysisPage')
);

const StockNewsPage = lazy(() =>
  import('../pages/StockNewsPage/StockNewsPage')
);

const EducationPage = lazy(() =>
  import('../pages/EducationPage/EducationPage')
);
const TrendingToolbar = lazy(() =>
  import('../components/TrendingToolbar/TrendingToolbar')
);
const CompoundInterestCalculator = lazy(() =>
  import('../components/CompoundInterestCalculator/CompoundInterestCalculator')
);
const PercentageDifferenceCalculator = lazy(() =>
  import(
    '../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator'
  )
);
const SideBar = lazy(() => import('../layout/SideBar/SideBar'));
const NavBar = lazy(() => import('../layout/NavBar/NavBar'));

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [symbol, setSymbol] = useState(localStorage.getItem('lastStock'));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    dispatch(setUserSymbol(symbol));
    dispatch(fetchStocks(symbol));
    dispatch(fetchStockPrice(symbol));
  }, [dispatch, symbol]);

  const handleSymbolSearch = (query) => {
    setSymbol(query);
    localStorage.setItem('lastStock', query);
    dispatch(setUserSymbol(query));
    dispatch(fetchStocks(query));
    dispatch(fetchStockPrice(query));
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
              <Route path='/chart-analysis' element={<ChartAnalysisPage />} />
              <Route
                path='/compound-interest-calculator'
                element={<CompoundInterestCalculator />}
              />
              <Route
                path='/percentage-difference'
                element={<PercentageDifferenceCalculator />}
              />

              <Route path='/stock-news' element={<StockNewsPage />} />
              <Route path='/education' element={<EducationPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;