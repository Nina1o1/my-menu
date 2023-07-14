import terms from '../../../assets/terms.json';
function SearchBar({setSearchCount, inputText}) {
  function handleSearch(evt) {
    evt.preventDefault();
    setSearchCount(prev => ++prev);
  }
  return(
    <div className="search-container">
      <button onClick={handleSearch} type="submit" className="search-btn">Search</button>
      <input type="text" name="search" className="search-bar text" 
        placeholder={terms["dict-search"]} 
        ref={inputText}/>
    </div>
  )
}

export default SearchBar;