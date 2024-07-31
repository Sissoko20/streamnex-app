import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  return (
    <Search
      placeholder="Rechercher une chaîne"
      onSearch={onSearch}
      style={{ marginBottom: "20px" }}
    />
  );
};

export default SearchBar;
