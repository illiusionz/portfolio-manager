import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './SideBar.scss';
import {
  FaHome,
  FaChartLine,
  FaCalendarAlt,
  FaNewspaper,
  FaTools,
  FaComments,
  FaChartPie,
  FaChartArea,
  FaChalkboardTeacher,
  FaDollarSign,
} from 'react-icons/fa';

const navigationItems = [
  { to: '/', icon: FaHome, label: 'Dashboard' },
  { to: '/asset-management', icon: FaChartPie, label: 'Asset Manager' },
  { to: '/stock-portfolio', icon: FaChartLine, label: 'Stock Portfolio' },
  { to: '/ai-assistant', icon: FaChartArea, label: 'A.I. Assistant' },
  { to: '/calendar', icon: FaCalendarAlt, label: 'Calendar' },
  { to: '/stock-news', icon: FaNewspaper, label: 'Stock News' },
  { to: '/education', icon: FaChalkboardTeacher, label: 'Education' },
  { to: '/market-tools', icon: FaTools, label: 'Market Tools' },
  { to: '/messages', icon: FaComments, label: 'Messages' },
  { to: '/plaid', icon: FaDollarSign, label: 'Plaid' },
];

const SideBar = () => {
  return (
    <nav className='sidebar'>
      <div className='sidebar-header'>
        <img src={logo} alt='Logo' className='logo' />
      </div>
      <ul>
        {navigationItems.map(({ to, icon: Icon, label }) => (
          <Link to={to} key={to}>
            {' '}
            {/* Moved the key to the Link component */}
            <li>
              <Icon className='icon' /> {label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
