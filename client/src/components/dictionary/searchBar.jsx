import { useEffect, useState } from 'react';
import terms from '../../assets/terms.json';
import { styleToggleHelper } from './dictHelper';

function SearchBar({setSearchCount, inputText, displayMode}) {
  const [searchBtnStyle, setSearchBtnStyle] = useState("search-btn");
  const [searchBarStyle, setSearchBarStyle] = useState("search-bar");
    
  // turn into display mode upon displayMode change
  useEffect(() => { 
    const styleToggle = styleToggleHelper(displayMode);
    setSearchBtnStyle(styleToggle(searchBtnStyle));
    setSearchBarStyle(styleToggle(searchBarStyle));
  },[displayMode])
  
  // re-render dictionary component when click on search btn
  function handleSearch(evt) {
    evt.preventDefault();
    setSearchCount(prev => ++prev);
  }


  return(
    <div className="search-container">
      <button 
        type="submit" 
        onClick={handleSearch} 
        className={searchBtnStyle}>
        {displayMode ? "Go" : "Search"}
      </button>

      <input 
        type="text" 
        className={`text ${searchBarStyle}`} 
        placeholder={`${terms["dict-search"]}`}
        ref={inputText}/>
    </div>
  )
}

export default SearchBar;