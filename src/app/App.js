import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  fetchStocks,
  fetchStockSnapshot,
} from '../features/stocks/stockThunks';
import { setUserSymbol } from '../features/user/userSlice';
import { setTheme } from '../features/theme/themeSlice';
import { selectTheme } from '../features/theme/themeSelectors';
import '../styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout and components
import SideBar from '../layout/SideBar/SideBar';
import NavBar from '../layout/NavBar/NavBar';
import TrendingToolbar from '../components/TrendingToolbar/TrendingToolbar';
import HomePage from '../pages/HomePage/HomePage';
const PortfolioPage = React.lazy(() =>
  import('../pages/PortfolioPage/PortfolioPage')
);

const AssetManagementPage = React.lazy(() =>
  import('../pages/AssetManagementPage/AssetManagementPage')
);
const ChartAnalysisPage = React.lazy(() =>
  import('../pages/ChartAnalysisPage/ChartAnalysisPage')
);
const CalendarPage = React.lazy(() =>
  import('../pages/CalendarPage/CalendarPage')
);
const StockNewsPage = React.lazy(() =>
  import('../pages/StockNewsPage/StockNewsPage')
);
const EducationPage = React.lazy(() =>
  import('../pages/EducationPage/EducationPage')
);
const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'));

function App() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useSelector(selectTheme);
  const reduxSymbol = useSelector((state) => state.user.userSymbol);
  const [userSymbol, setSymbol] = useState(
    localStorage.getItem('selectedStockSymbol') || 'AAPL'
  );

  useEffect(() => {
    if (!reduxSymbol) {
      dispatch(setUserSymbol(userSymbol)); // Set initial symbol in Redux
    }
    dispatch(fetchStocks(userSymbol)); // Fetch initial stock data
    dispatch(fetchStockSnapshot(userSymbol)); // Fetch stock snapshot
  }, [reduxSymbol, userSymbol, dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    const newTheme = theme === 'theme-light' ? 'theme-dark' : 'theme-light';
    dispatch(setTheme(newTheme));
    localStorage.setItem('theme', newTheme);
  };

  const handleSymbolSearch = (query) => {
    setSymbol(query);
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
        <NavBar
          toggleSidebar={toggleSidebar}
          handleSymbolSearch={handleSymbolSearch}
          toggleTheme={toggleTheme}
        />
        <TrendingToolbar />
        <div className='container-fluid'>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/stock-portfolio' element={<PortfolioPage />} />

              <Route
                path='/asset-management'
                element={<AssetManagementPage />}
              />
              <Route path='/calendar' element={<CalendarPage />} />
              <Route path='/ai-assistant' element={<ChartAnalysisPage />} />
              <Route path='/stock-news' element={<StockNewsPage />} />
              <Route path='/education' element={<EducationPage />} />
              <Route path='/plaid' element={<Dashboard />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
