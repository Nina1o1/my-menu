import terms from '../../../assets/terms.json';
function SearchBar() {
  return(
    <div className="search-container">
      <button type="submit" className="search-btn">Search</button>
      <input type="text" name="search" className="search-bar text" placeholder={terms["dict-search"]} />
    </div>
  )
}

export default SearchBar;