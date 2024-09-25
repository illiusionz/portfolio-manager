import React from 'react';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer mt-auto py-3'>
      <div className='container'>
        <p className='text-center mb-0'>
          &copy; {currentYear} All Rights Reserved | By Jeffrey Liu
        </p>
      </div>
    </footer>
  );
};

export default Footer;
