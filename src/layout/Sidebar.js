import React from 'react';
import './Sidebar.css'; // Ensure this import is correct

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  toggleDarkMode,
  isDarkMode,
}) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''} bg-light`}>
      <button className='btn btn-primary mt-4' onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      <button className='btn btn-secondary mt-2' onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default Sidebar;
