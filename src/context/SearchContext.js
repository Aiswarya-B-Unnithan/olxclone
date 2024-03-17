import { createContext, useState } from "react";

export const SearchContext = createContext(null);

function Search({ children }) {
  const [searchedproducts, setSearchedProducts] = useState([]);
  console.log("SEARCHEDpRODUCTS", searchedproducts);
  return (
    <SearchContext.Provider value={{ searchedproducts, setSearchedProducts }}>
      {children}
    </SearchContext.Provider>
  );
}
export default Search;
