import React from 'react';
import "./Header.css";

const LOGO = "https://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png";


function Header() {
    return (
      <div className="header">
        <div className='header-logo'>
            <img src={LOGO} alt="" />
        </div>
        <div className='header-search'>
            <form className="header-form">
                <input name="search" className='search-bar' placeholder='Search baords...'/>
            </form>
        </div>
        <div className='header-filters'>
            <button type="submit" className='all-button'>All</button>
            <button type="submit" className='recent-button'>Recent</button>
            <button type="submit" className='celebration-button'>Celebration</button>
            <button type="submit" className='thankyou-button'>Thank You</button>
            <button type="submit" className='inspiration-button'>Inspiration</button>
        </div>
        <div className='header-create'>
            <button type="submit" className='create-button'>Create A New Board</button>
        </div>
      </div>
    );
  }
  
  export default Header;
