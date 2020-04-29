import React from 'react';

import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <h1 className="header__title">
            Rom@x
          </h1>

          <select className="header__select-srever">
            <option value="">europe</option>
            <option value="">sea</option>
            <option value="">global</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Header;