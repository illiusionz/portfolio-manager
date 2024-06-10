import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomePage from './containers/HomePage/HomePage';
import AssetManagement from './containers/AssetManagement/AssetManagement';
import CompoundInterestCalculator from './components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from './components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchStocks, fetchStockPrice } from './redux/actions/stockActions';
import { setUserSymbol } from './redux/actions/userActions';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState(
    localStorage.getItem('lastStock') || 'TSLA'
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <Router>
      <div className={`d-flex ${isSidebarOpen ? '' : 'toggled'}`} id='wrapper'>
        <Sidebar />
        <div id='page-content-wrapper'>
          <Navbar
            toggleSidebar={toggleSidebar}
            handleSymbolSearch={handleSymbolSearch}
          />
          <div className='container-fluid'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route
                path='/compound-interest-calculator'
                element={<CompoundInterestCalculator />}
              />
              <Route
                path='/percentage-difference'
                element={<PercentageDifferenceCalculator />}
              />
              <Route path='/asset-management' element={<AssetManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
