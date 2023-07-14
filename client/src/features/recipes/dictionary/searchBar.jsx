import terms from '../../../assets/terms.json';
function SearchBar({inputText}) {
  return(
    <div className="search-container">
      <button type="submit" className="search-btn">Search</button>
      <input type="text" name="search" className="search-bar text" 
        placeholder={terms["dict-search"]} 
        ref={inputText}/>
    </div>
  )
}

export default SearchBar;