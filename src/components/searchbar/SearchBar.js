import React from "react";

const SearchBar = ({value, searchChange}) => {
    return <input className="SearchBar" type="search" value={value} placeholder="Search your robot friend" onChange={searchChange} />
}

export default SearchBar