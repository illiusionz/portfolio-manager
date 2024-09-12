// src/layout/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {
  FaHome,
  FaChartLine,
  FaCalendarAlt,
  FaNewspaper,
  FaTools,
  FaCalculator,
  FaComments,
  FaChartPie,
  FaChartArea,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import './SideBar.scss';

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
            <FaChartLine className='icon' /> Stock Portolio
          </Link>
        </li>
        <li>
          <Link to='/chart-analysis'>
            <FaChartArea className='icon' /> A.I. Chart Analysis
          </Link>
        </li>
        <li>
          <Link to='/calendar'>
            <FaCalendarAlt className='icon' /> Calendar
          </Link>
        </li>
        <li>
          <Link to='/stock-news'>
            <FaNewspaper className='icon' /> Stock News
          </Link>
        </li>
        <li>
          <Link to='/asset-management'>
            <FaChartPie className='icon' /> Asset Management
          </Link>
        </li>
        <li>
          <Link to='/education'>
            <FaChalkboardTeacher className='icon' /> Education
          </Link>
        </li>
        <li>
          <Link to='/market-tools'>
            <FaTools className='icon' /> Market Tools
          </Link>
        </li>
        <li>
          <Link to='/market-tools'>
            <FaComments className='icon' /> Chat Room
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
