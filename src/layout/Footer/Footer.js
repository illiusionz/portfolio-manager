import React from 'react';
import './_footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer mt-auto py-3 bg-light'>
      <div className='container'>
        <p className='text-center mb-0'>
          &copy; {currentYear} All Rights Reserved | By Jeffrey Liu
        </p>
      </div>
    </footer>
  );
};

export default Footer;
