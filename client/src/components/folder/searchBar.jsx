import "./folder.css";
function SearchBar({setSearchCount}) {
  function handleClick (evt) {
    evt.preventDefault();
    setSearchCount(prev => ++prev);
  }
  return(
    <>
      <div className="search-container">
        <button 
          type="submit"
          className="search-btn"
          onClick={handleClick}>
          Find
        </button>

        <input 
          type="text" 
          className="search-bar" />
      </div>
    </>
  )
}

export default SearchBar;