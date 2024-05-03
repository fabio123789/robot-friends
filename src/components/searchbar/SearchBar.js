import React from "react";

const SearchBar = ({ value, searchChange, name, errorMessage, ...props }) => {
  return (
    <div {...props}>
      <p style={{ color: "white", marginLeft: "15px" }}>{name}</p>
      <input
        className="SearchBar"
        type="search"
        defaultValue={value}
        placeholder="Search your robot friend"
        onChange={searchChange}
      />
      <p style={{ color: "white", marginLeft: "15px" }}>{errorMessage}</p>{" "}
    </div>
  );
};

export default SearchBar;
