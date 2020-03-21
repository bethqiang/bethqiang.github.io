import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
