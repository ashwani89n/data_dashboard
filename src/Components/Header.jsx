import React from 'react';

const Header = (count) => (
  <div className="header-blocks">
    <div className='blocks'>
        <h4>Country</h4>
        <h4>United States</h4>
    </div>
    <div className='blocks'>
        <h4>Brewery Rich State</h4>
        <h4>{count.input3.toUpperCase()}</h4>
    </div>
    <div className='blocks'>
        <h4>Most Common</h4>
        <h4>{count.input2.toUpperCase()}</h4>
    </div>
    <div className='blocks'>
        <h4>Total Breweries</h4>
        <h4>{count.input}</h4>
    </div>
  </div>
);

export default Header;