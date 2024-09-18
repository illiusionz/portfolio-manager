import React from 'react';
import './_footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer>
      <p>&copy; {currentYear} All Rights Reserved | By Jeffrey Liu</p>
    </footer>
  );
};

export default Footer;
