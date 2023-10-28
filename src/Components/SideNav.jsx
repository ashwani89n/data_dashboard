import React from 'react';
import { Link } from "react-router-dom";

const SideNav = () => (
  <div className="sidenav">
    <div className='heading'>
      <h2>Brewery Stop🍺</h2>
    </div>
    <div >
        <button className='tabs'><Link to="/" className='linkInBlack'>🏠Dashboard</Link></button>
        <button className='tabs'><Link to="/" className='linkInBlack'>🔍Search</Link></button>
        <button className='tabs'><Link to="/about" className='linkInBlack'>ℹ️ About</Link></button>
    </div>
  </div>
);

export default SideNav;