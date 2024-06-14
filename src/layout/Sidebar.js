// src/layout/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import {
  FaHome,
  FaChartLine,
  FaFileInvoiceDollar,
  FaNewspaper,
  FaMoneyCheckAlt,
  FaBook,
  FaTools,
  FaCalculator,
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <div className='sidebar-header'>
        <img src={logo} alt='Logo' className='logo' />
      </div>
      <ul>
        <li>
          <Link to='/'>
            <FaHome className='icon' /> Dashboard
          </Link>
        </li>
        <li>
          <Link to='/trade-positions'>
            <FaChartLine className='icon' /> Trade Positions
          </Link>
        </li>
        <li>
          <Link to='/chart-analysis'>
            <FaChartLine className='icon' /> A.I. Chart Analysis
          </Link>
        </li>
        <li>
          <Link to='/income-report'>
            <FaFileInvoiceDollar className='icon' /> Income Earnings Report
          </Link>
        </li>
        <li>
          <Link to='/stock-news'>
            <FaNewspaper className='icon' /> Stock News
          </Link>
        </li>
        <li>
          <Link to='/asset-management'>
            <FaMoneyCheckAlt className='icon' /> Asset Management
          </Link>
        </li>
        <li>
          <Link to='/education'>
            <FaBook className='icon' /> Education
          </Link>
        </li>
        <li>
          <Link to='/market-tools'>
            <FaTools className='icon' /> Market Tools
          </Link>
        </li>
        <li>
          <Link to='/option-premium-calculator'>
            <FaCalculator className='icon' /> Option Premium Calculator
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
