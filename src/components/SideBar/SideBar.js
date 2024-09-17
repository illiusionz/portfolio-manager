// src/components/SideBar/SideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './_sideBar.scss';
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

const navigationItems = [
  { to: '/', icon: FaHome, label: 'Dashboard' },
  { to: '/trade-positions', icon: FaChartLine, label: 'Stock Portfolio' },
  { to: '/chart-analysis', icon: FaChartArea, label: 'A.I. Chart Analysis' },
  { to: '/calendar', icon: FaCalendarAlt, label: 'Calendar' },
  { to: '/stock-news', icon: FaNewspaper, label: 'Stock News' },
  { to: '/asset-management', icon: FaChartPie, label: 'Asset Management' },
  { to: '/education', icon: FaChalkboardTeacher, label: 'Education' },
  { to: '/market-tools', icon: FaTools, label: 'Market Tools' },
  { to: '/chat-room', icon: FaComments, label: 'Chat Room' },
  {
    to: '/option-premium-calculator',
    icon: FaCalculator,
    label: 'Option Premium Calculator',
  },
];

const SideBar = () => {
  return (
    <nav className='sidebar'>
      <div className='sidebar-header'>
        <img src={logo} alt='Logo' className='logo' />
      </div>
      <ul>
        {navigationItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <Link to={to}>
              <Icon className='icon' /> {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
