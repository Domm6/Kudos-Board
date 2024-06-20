import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Header.css";

const LOGO = "https://i.vimeocdn.com/video/557834687-b8d55eb049d1702b589b4ad62c31fe18ac0f44f0316546d6aef20c61be70435c-d_640?f=webp";


function Header({onOpen, searchTerm, setSearchTerm, setFilter}) {
    const handleSearchSubmit = (e) => {
        e.preventDefault();
    }
    console.log("Current search term:", searchTerm); // Monitor search term updates
    return (
      <div className="header">
        <div className='header-logo'>
            <img src={LOGO} alt="" />
        </div>
        <div className='header-search'>
            <form className="header-form" onSubmit={handleSearchSubmit}>
                <input name="search" className='search-bar' placeholder='Search baords...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </form>
        </div>
        <div className='header-filters'>
            <button onClick={(e) => setFilter("All")} className='all-button'>All</button>
            <button onClick={(e) => setFilter("Recent")} className='recent-button'>Recent</button>
            <button onClick={(e) => setFilter("Celebration")} className='celebration-button'>Celebration</button>
            <button onClick={(e) => setFilter("Thank You")} className='thankyou-button'>Thank You</button>
            <button onClick={(e) => setFilter("Inspiration")} className='inspiration-button'>Inspiration</button>
        </div>
        <div className='header-create'>
            <button type="submit" className='create-button' onClick={onOpen}>Create A New Board</button>
        </div>
      </div>
    );
  }
  
  export default Header;
