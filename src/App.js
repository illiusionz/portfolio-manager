import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchStocks, fetchStockPrice } from './redux/actions/stockActions';
import { setUserSymbol } from './redux/actions/userActions';
import { setTheme } from './redux/actions/themeActions';

// Lazy load the components
const HomePage = lazy(() => import('./containers/HomePage/HomePage'));
const ChartAnalysisPage = lazy(() =>
  import('./containers/ChartAnalysisPage/ChartAnalysisPage')
);
// const AssetManagement = lazy(() => import('./containers/AssetManagement/AssetManagement'));
const EducationPage = lazy(() =>
  import('./containers/EducationPage/EducationPage')
);
const TrendingToolbar = lazy(() =>
  import('./components/TrendingToolbar/TrendingToolbar')
);
const CompoundInterestCalculator = lazy(() =>
  import('./components/CompoundInterestCalculator/CompoundInterestCalculator')
);
const PercentageDifferenceCalculator = lazy(() =>
  import(
    './components/PercentageDifferenceCalculator/PercentageDifferenceCalculator'
  )
);
const Sidebar = lazy(() => import('./layout/Sidebar'));
const Navbar = lazy(() => import('./layout/Navbar'));

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [symbol, setSymbol] = useState(
    localStorage.getItem('lastStock') || 'TSLA'
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
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
    <Provider store={store}>
      <Router>
        <div
          className={`d-flex ${isSidebarOpen ? '' : 'toggled'}`}
          id='wrapper'>
          <Suspense fallback={<div>Loading...</div>}>
            <Sidebar />
          </Suspense>
          <div id='page-content-wrapper' className={theme}>
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar
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
                  <Route
                    path='/chart-analysis'
                    element={<ChartAnalysisPage />}
                  />
                  <Route
                    path='/compound-interest-calculator'
                    element={<CompoundInterestCalculator />}
                  />
                  <Route
                    path='/percentage-difference'
                    element={<PercentageDifferenceCalculator />}
                  />
                  {/*<Route path='/asset-management' element={<AssetManagement />} />*/}
                  <Route path='/education' element={<EducationPage />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
